import Nat "mo:core/Nat";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";

actor {
  let scores = List.empty<(Text, Nat)>();

  func compareScores(a : (Text, Nat), b : (Text, Nat)) : Order.Order {
    Nat.compare(b.1, a.1);
  };

  public shared ({ caller }) func submitScore(name : Text, score : Nat) : async () {
    scores.add((name, score));
  };

  public query ({ caller }) func getLeaderboard() : async [(Text, Nat)] {
    scores.toArray().sort(compareScores);
  };
};
