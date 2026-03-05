import Network

final class NetworkMonitor {
  typealias StatusHandler = (NWPath.Status) -> Void

  private let queue = DispatchQueue.global(qos: .background)
  private var monitor: NWPathMonitor

  init() {
    monitor = NWPathMonitor()
  }

  func startMonitoring(statusUpdateHandler: @escaping StatusHandler) {
    monitor.pathUpdateHandler = { path in
      DispatchQueue.main.async {
        statusUpdateHandler(path.status)
      }
    }

    monitor.start(queue: queue)
  }

  func stopMonitoring() {
    monitor.cancel()
  }

  func currentNetworkState() -> NWPath {
    monitor.currentPath
  }
}
