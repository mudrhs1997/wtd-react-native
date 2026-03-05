import Foundation

public enum OrderType {
  case bid
  case ask
}

public struct OrderBook: Codable {
  public let id: String
  public let clubId: String
  public let orderType: String
  public let orderPrice: Int

  enum CodingKeys: String, CodingKey {
    case id
    case clubId = "club_id"
    case orderType = "order_type"
    case orderPrice = "order_price"
  }
}
