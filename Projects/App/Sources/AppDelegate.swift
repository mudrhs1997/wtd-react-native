import RootFeature
import SplashFeature
import Swinject
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  static let container = Container()
  var assembler: Assembler!

  func application(
    _: UIApplication,
    didFinishLaunchingWithOptions _: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    assembler = Assembler([
      RootAssembly(),
      SplashAssembly(),
    ], container: AppDelegate.container)

    return true
  }

  func application(
    _: UIApplication,
    configurationForConnecting connectingSceneSession: UISceneSession,
    options _: UIScene.ConnectionOptions
  ) -> UISceneConfiguration {
    UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
  }

  func application(_: UIApplication, didDiscardSceneSessions _: Set<UISceneSession>) {}
}
