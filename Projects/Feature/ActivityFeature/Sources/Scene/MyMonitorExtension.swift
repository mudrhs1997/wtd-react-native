import DeviceActivity
import ManagedSettings
import ManagedSettingsUI

class MyMonitorExtension: DeviceActivityMonitor {
    let store = ManagedSettingsStore()
    
    override func intervalDidStart(for activity: DeviceActivityName) {
        super.intervalDidStart(for: activity)
        
//        let model = MyModel()
//        let applications = model.selectionToShield.applications
//        store.shield.applications =
    }
}

