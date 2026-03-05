import SplashFeatureInterface
import Swinject

public final class RootAssembly: Assembly {
  public init() {}

  public func assemble(container: Container) {
    container.register(RootCoordinator.self) { resolver, window in
      RootCoordinator(
        window: window,
        splashFactory: resolver.resolve(SplashFactory.self)!
      )
    }
  }
}
