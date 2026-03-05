import BaseFeature
import MainFeatureInterface
import OnboardingFeatureInterface
import SigninFeatureInterface
import SplashFeatureInterface
import UIKit

public final class RootCoordinator: BaseCoordinator {
  private let window: UIWindow

  private let splashFactory: SplashFactory

  public init(
    window: UIWindow,
    splashFactory: SplashFactory
  ) {
    self.window = window
    self.splashFactory = splashFactory
    self.window.makeKeyAndVisible()
  }

  override public func start() {
    startSplashFlow()
  }

  func startSplashFlow() {
    let splashCoordinator = splashFactory.makeCoordinator()
    addChild(splashCoordinator)
    splashCoordinator.start()
    setRootViewController(to: splashCoordinator.rootViewController)
  }

  func startToSignInFlow() {}

  func startToMainFlow() {}
}

extension RootCoordinator {
  private func setRootViewController(to viewController: UIViewController) {
    UIView.transition(
      with: window,
      duration: 0.3,
      options: .transitionCrossDissolve
    ) {
      self.window.rootViewController = viewController
    }
  }
}
