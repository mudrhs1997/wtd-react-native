import UIKit

public protocol Coordinator {
  var rootViewController: UIViewController { get }
  var parent: Coordinator? { get set }
  var children: [Coordinator] { get set }

  func start()
}

open class BaseCoordinator: Coordinator {
  public var parent: Coordinator?
  public var children: [Coordinator] = []

  public init() {}

  open var rootViewController: UIViewController {
    fatalError("Subclasses must override rootViewController")
  }

  open func start() {
    fatalError("start() must be overridden")
  }

  public func addChild(_ coordinator: Coordinator) {
    guard let coordinator = coordinator as? BaseCoordinator else { return }
    children.append(coordinator)
    coordinator.parent = self
  }
}
