import UIKit

public protocol Router {
  associatedtype RoutePath
  var navigationController: UINavigationController { get }

  func route(to path: RoutePath)
}

// open class AppRouter: Router {
//  private weak var navigationController: UINavigationController?
//
//  public init(navigationController: UINavigationController) {
//    self.navigationController = navigationController
//  }
//
//  public func setRoot(_ viewController: UIViewController) {
//    navigationController.setViewControllers([viewController], animated: false)
//  }
//
//  public func present(_ viewController: UIViewController, animated: Bool) {
//    navigationController.present(viewController, animated: animated)
//  }
//
//  public func push(_ viewController: UIViewController, animated: Bool) {
//    navigationController.pushViewController(viewController, animated: animated)
//  }
//
//  public func pop(animated: Bool) {
//    navigationController.popViewController(animated: animated)
//  }
//
//  public func dismiss(animated: Bool) {
//    navigationController.dismiss(animated: animated)
//  }
// }
