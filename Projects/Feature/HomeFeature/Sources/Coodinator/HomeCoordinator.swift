import BaseFeature
import UIKit


public final class HomeCoordinator: BaseCoordinator {
  private let homeRouter: HomeRouter
  private let homeViewController: HomeViewController

  override public var rootViewController: UIViewController {
    homeRouter.navigationController
  }

  init(homeRouter: HomeRouter, homeViewController: HomeViewController) {
    self.homeRouter = homeRouter
    self.homeViewController = homeViewController
  }

  override public func start() {
    
  }

}
