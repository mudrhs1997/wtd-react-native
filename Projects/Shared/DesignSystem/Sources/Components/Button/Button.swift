// import UIKit
//
//
// public class PressingButton: UIButton {
//
//  public enum FontSize {
//    case big
//    case med
//    case small
//  }
//
//  public init(title: String, hasBackground: Bool = false, fontSize: FontSize) {
//    super.init(frame: .zero)
//    self.setTitle(title, for: .normal)
//    self.frame = .zero
//    self.layer.cornerRadius = 12
//    self.layer.masksToBounds = true
//
//    self.backgroundColor = hasBackground ? .black : .clear
//
//    let titleColor: UIColor = hasBackground ? .white : .black
//    self.setTitleColor(titleColor, for: .normal)
//
//    switch fontSize {
//    case .big:
//      self.titleLabel?.font = .systemFont(ofSize: 20, weight: .bold)
//
//    case .med:
//      self.titleLabel?.font = .systemFont(ofSize: 16, weight: .regular)
//
//    case .small:
//      self.titleLabel?.font = .systemFont(ofSize: 16, weight: .regular)
//    }
//
//    addTarget(self, action: #selector(buttonTouchDown), for: .touchDown)
//    addTarget(self, action: #selector(buttonTouchUp), for: .touchUpInside)
//  }
//
//  required init?(coder: NSCoder) {
//    fatalError("init(coder:) has not been implemented")
//  }
// }
//
// extension PressingButton {
//  @objc private func buttonTouchDown() {
//    UIView.animate(withDuration: 0.1) {
//      self.transform = CGAffineTransform(scaleX: 0.95, y: 0.95)
//      self.layer.shadowOpacity = 0.5
//    }
//  }
//
//  // 버튼에서 손을 뗐을 때 애니메이션
//  @objc private func buttonTouchUp() {
//    UIView.animate(withDuration: 0.1, delay: 0, usingSpringWithDamping: 0.5, initialSpringVelocity: 6, options: .allowUserInteraction, animations: {
//      self.transform = .identity
//      self.layer.shadowOpacity = 0.3
//    }, completion: nil)
//  }
// }
