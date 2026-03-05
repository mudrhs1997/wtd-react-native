import BaseFeature
import UIKit


public enum ActivityRoutePath: RoutePath {
  case activity
}


public final class ActivityRouter: Router {
  public typealias RoutePath = ActivityRoutePath
  public var navigationController = UINavigationController()
  private let activityViewController: ActivityViewController
  
  init(activityViewController: ActivityViewController) {
    self.activityViewController = activityViewController
  }

  public func route(to path: ActivityRoutePath) {
    switch path {
    case .activity:
      print("Activity")
    }
  }

}
