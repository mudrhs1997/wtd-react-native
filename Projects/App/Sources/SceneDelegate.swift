import BaseFeature
import RootFeature
import SplashFeatureInterface
import UIKit

final class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?
  private var rootCoordinator: Coordinator?

  func scene(_ scene: UIScene, willConnectTo _: UISceneSession, options _: UIScene.ConnectionOptions) {
    guard let scene = (scene as? UIWindowScene) else { return }

    let window = UIWindow(windowScene: scene)
    guard let rootCoordinator = AppDelegate
      .container
      .resolve(
        RootCoordinator.self,
        argument: window
      ) else { return }

    rootCoordinator.start()
    self.window = window
  }
}
