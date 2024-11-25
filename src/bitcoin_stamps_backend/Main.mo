import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import { phash; thash; nhash } "mo:map/Map";
import Map "mo:map/Map";
import Vector "mo:vector";

import BitcoinApi "BitcoinApi";
import P2pkh "P2pkh";
import P2trRawKeySpend "P2trRawKeySpend";
import P2trScriptSpend "P2trScriptSpend";
import Types "Types";
import Utils "Utils";

actor class BasicBitcoin(_network : Types.Network) {
  type GetUtxosResponse = Types.GetUtxosResponse;
  type GetUtxos2Response = Types.GetUtxos2Response;
  type MillisatoshiPerVByte = Types.MillisatoshiPerVByte;
  type SendRequest = Types.SendRequest;
  type TimestampRequest = Types.TimestampRequest;
  type Network = Types.Network;
  type BitcoinAddress = Types.BitcoinAddress;
  type Satoshi = Types.Satoshi;
  type TransactionId = Text;
  type Timestamp = Types.Timestamp;
  
  stable let pToTimestamps = Map.new<Principal, Vector.Vector<Timestamp>>();

  public type GetBlockHeadersResult2 = {
      tip_height : Nat32;
      bitcoin_block_header : [Text];
  };

  // The Bitcoin network to connect to.
  //
  // When developing locally this should be `regtest`.
  // When deploying to the IC this should be `testnet`.
  // `mainnet` is currently unsupported.
  stable let NETWORK : Network = _network;

  // The derivation path to use for ECDSA secp256k1.
  let DERIVATION_PATH : [[Nat8]] = [];

  // The ECDSA key name.
  let KEY_NAME : Text = switch NETWORK {
    // For local development, we use a special test key with dfx.
    case (#regtest) "dfx_test_key";
    // On the IC we're using a test ECDSA key.
    case _ "test_key_1";
  };

  /// Returns the balance of the given Bitcoin address.
  public func get_balance(address : BitcoinAddress) : async Satoshi {
    await BitcoinApi.get_balance(NETWORK, address);
  };

  /// Returns the UTXOs of the given Bitcoin address.
  public func get_utxos(address : BitcoinAddress) : async GetUtxosResponse {
    await BitcoinApi.get_utxos(NETWORK, address);
  };

  /// Returns the UTXOs of the given Bitcoin address.
  public func get_block_headers(start_height: Nat32, end_height: ?Nat32) : async GetBlockHeadersResult2 {
    let result = await BitcoinApi.get_block_headers(NETWORK, start_height, end_height);
    return {
      tip_height = result.tip_height;
      bitcoin_block_header = Array.map<[Nat8], Text>(result.bitcoin_block_header, func x = Utils.unwrap(Text.decodeUtf8(Blob.fromArray(x))));
    }
  };

  /// Returns the 100 fee percentiles measured in millisatoshi/vbyte.
  /// Percentiles are computed from the last 10,000 transactions (if available).
  public func get_current_fee_percentiles() : async [MillisatoshiPerVByte] {
    await BitcoinApi.get_current_fee_percentiles(NETWORK);
  };

  /// Returns the P2PKH address of this canister at a specific derivation path.
  public func get_p2pkh_address() : async BitcoinAddress {
    await P2pkh.get_address(NETWORK, KEY_NAME, DERIVATION_PATH);
  };

  public shared ({ caller }) func create_timestamp(request : TimestampRequest) : async TransactionId {
    let txid = Utils.bytesToText(await P2pkh.timestamp(NETWORK, DERIVATION_PATH, KEY_NAME, Blob.toArray(Text.encodeUtf8(request.data))));
    let timestamp: Timestamp = {
      txid = txid;
      name = request.name;
      time = Time.now();
    };
    let userTs = Map.get(pToTimestamps, phash, caller);
    switch (userTs) {
      case (null) {
        Map.set(pToTimestamps, phash, caller, Vector.fromArray<Timestamp>([timestamp]));
      };
      case (?ts) {
        Vector.add(ts, timestamp);
        Map.set(pToTimestamps, phash, caller, ts);
      };
    };
    txid;
  };

  public func get_all_timestamps() : async [Timestamp] {
    let timestamps = Iter.toArray(Map.vals<Principal, Vector.Vector<Timestamp>>(pToTimestamps));
    let asArrays = Array.map<Vector.Vector<Timestamp>, [Timestamp]>(timestamps, func y = Vector.toArray<Timestamp>(y));
    return Array.flatten<Timestamp>(asArrays);
  };

  public shared ({ caller }) func get_timestamps() : async [Timestamp] {
    let userTs = Map.get(pToTimestamps, phash, caller);
    switch (userTs) {
      case (?ts) {
        Vector.toArray(ts);
      };
      case (null) {
        [];
      };
    };
  };

  /// Sends the given amount of bitcoin from this canister to the given address.
  /// Returns the transaction ID.
  public func send_from_p2pkh_address(request : SendRequest) : async TransactionId {
    Utils.bytesToText(await P2pkh.send(NETWORK, DERIVATION_PATH, KEY_NAME, request.destination_address, request.amount_in_satoshi));
  };
};
