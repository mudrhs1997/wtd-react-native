import SplashFeatureInterface
import Swinject

public final class SplashAssembly: Assembly {
  public init() {}

  public func assemble(container: Container) {
    container.register(SplashFactory.self) { _ in
      SplashFactoryImpl()
    }
  }
}
