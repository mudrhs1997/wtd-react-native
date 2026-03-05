import UIKit
@testable import OnboardingFeature

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  func application(
    _: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    window = UIWindow(frame: UIScreen.main.bounds)

    let viewModel = OnboardingViewModel()
    let viewController = OnboardingViewController(viewModel: viewModel)
    let navigationController = UINavigationController(rootViewController: viewController)

    window?.rootViewController = navigationController
    window?.makeKeyAndVisible()

    return true
  }
}
