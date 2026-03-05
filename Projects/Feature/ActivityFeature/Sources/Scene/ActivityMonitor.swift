import SwiftUI
import FamilyControls
import DeviceActivity
import ManagedSettings
import ManagedSettingsUI

extension DeviceActivityName {
  static let daily = Self("daily")
}

extension ManagedSettingsStore.Name {
  static let social = Self("social")
}

let schedule = DeviceActivitySchedule(
  intervalStart: DateComponents(hour: 0, minute: 0),
  intervalEnd: DateComponents(hour: 23, minute: 59),
  repeats: true
)

class ScheduleModel {
  static public func setSchedule() {
    print("Setting up the schedule")
  }
}

class MyMonitor: DeviceActivityMonitor {
    let model: ActivityViewModel
    let center: DeviceActivityCenter

    init(
        model: ActivityViewModel,
        center: DeviceActivityCenter
    ) {
        self.model = model
        self.center = center
    }

  override func intervalDidStart(for activity: DeviceActivityName) {
    super.intervalDidStart(for: activity)

      do {
          try center.startMonitoring(.daily, during: schedule)
      } catch {
          print("monitoring Error")
      }
  }

  override func intervalDidEnd(for activity: DeviceActivityName) {
    super.intervalDidEnd(for: activity)

      center.stopMonitoring()
  }
}


