
public protocol RoutePath {}

public protocol Route {
  associatedtype Destination
  func build() -> Destination
}
