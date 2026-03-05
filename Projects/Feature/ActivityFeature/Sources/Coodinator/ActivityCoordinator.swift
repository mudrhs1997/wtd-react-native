import BaseFeature


public final class ActivityCoordinator: BaseCoordinator {
  private let activityRouter: ActivityRouter
  private let acvivityViewController: ActivityViewController

  init(activityRouter: ActivityRouter, acvivityViewController: ActivityViewController) {
    self.activityRouter = activityRouter
    self.acvivityViewController = acvivityViewController
  }

  override public func start() {
    
  }

}
