import BaseFeature
import UIKit

public final class SplashCoordinator: BaseCoordinator {
  private let splashRouter: SplashRouter
  private let splashViewController: SplashViewController

  override public var rootViewController: UINavigationController {
    splashRouter.navigationController
  }

  init(
    splashRouter: SplashRouter,
    splashViewController: SplashViewController
  ) {
    self.splashRouter = splashRouter
    self.splashViewController = splashViewController
  }

  override public func start() {
    showSplashView()
  }

  private func showSplashView() {
    rootViewController.setViewControllers([splashViewController], animated: true)
  }
}
