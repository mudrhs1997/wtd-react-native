import BaseFeature
import UIKit
import MainFeatureInterface


public enum SplashRouterPath: RoutePath {
  case splash
  case main
  case signIn
}

public final class SplashRouter: Router {
  public typealias RoutePath = SplashRouterPath
  public var navigationController = UINavigationController()
  private let splashViewController: SplashViewController

  init(
    splashViewController: SplashViewController,
  ) {
    self.splashViewController = splashViewController
  }

  public func route(to path: SplashRouterPath) {
    switch path {
    case .splash:
      navigationController.setViewControllers([splashViewController], animated: true)
    case .main:
      print("Main")
    case .signIn:
      print("Sign In")
    }
  }

}
