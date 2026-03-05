import BaseFeature


public enum MainRoutePath: RoutePath {
  case main
  case selectTab(tab: Int)
}

final class MainRouter: Router {
  public typealias RoutePath = MainRoutePath
  public var navigationController = UINavigationController()


  public func route(to path: MainRoutePath) {
    switch path {
    case .main:
      print("Main")
    case .selectTab(let tab):
      print("Tab \(tab)")
    }
  }
}
