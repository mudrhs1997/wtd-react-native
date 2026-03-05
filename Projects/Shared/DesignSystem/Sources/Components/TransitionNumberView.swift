// import UIKit
// import SwiftUI
//
//
// public class TransitionNumberView: UIView {
//  private let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//
//  let numberScrollView: UIScrollView = {
//    let scrollView = UIScrollView()
//    scrollView.translatesAutoresizingMaskIntoConstraints = false
//    return scrollView
//  }()
//
//  let numberView = NumberView()
//
//  public override init(frame: CGRect) {
//    super.init(frame: frame)
//    backgroundColor = .systemRed
//
//    configuration()
//    setComponents()
//    setLayout()
//  }
//
//  required init?(coder: NSCoder) {
//    fatalError("init(coder:) has not been implemented")
//  }
//
//  private func configuration() {
//
//  }
//
////  func changeNumber() {
////    let indexPath = IndexPath(row: numbers.randomElement()!, section: 0)
////    let rect = numberScrollView.rectForRow(at: indexPath)
////
////    UIView.animate(withDuration: 0.09) {
////      self.numberScrollView.setContentOffset(CGPoint(x: 0, y: rect.origin.y + 20), animated: true)
////    } completion: { _ in
////      UIView.animate(withDuration: 0.09) {
////        self.numberScrollView.setContentOffset(CGPoint(x: 0, y: rect.origin.y), animated: true)
////      }
////    }
////  }
//
//  // 숫자 이동 함수
//  public func moveToHigherNumber(_ targetIndex: Int) {
//      guard targetIndex >= 0 && targetIndex < numbers.count else { return }
//
//    let targetY = CGFloat(targetIndex) * frame.height  // 숫자 높이(80) + 간격(10)
//
//      // 바운스 애니메이션
////      UIView.animate(withDuration: 0.09, animations: {
////          self.scrollView.setContentOffset(CGPoint(x: 0, y: targetY + 20), animated: false) // 목표 위치보다 약간 위로 이동
////      }) { _ in
////        UIView.animate(withDuration: 0.09, animations: {
////            self.scrollView.setContentOffset(CGPoint(x: 0, y: targetY), animated: false) // 목표 위치로 복귀
////          })
////      }
//  }
//
//  public func moveToLowerNumber(_ targetNumber: Int) {
//
//  }
//
// }
//
// extension TransitionNumberView {
//  func setComponents() {
//    addSubview(numberScrollView)
//    numberScrollView.addSubview(numberView)
//
//  }
//
//  func setLayout() {
//    numberScrollView.snp.makeConstraints { make in
//      make.top.leading.trailing.bottom.equalToSuperview()
//    }
//
//    numberView.snp.makeConstraints { make in
//      make.top.leading.trailing.bottom.equalToSuperview()
//    }
//  }
// }
//
// class NumberCell: UITableViewCell {
//  static let identifier = "numberCell"
//
//  private let numberLabel: UILabel = {
//    let label = UILabel()
//    label.translatesAutoresizingMaskIntoConstraints = false
//    label.adjustsFontSizeToFitWidth = true
//    label.minimumScaleFactor = 0.5
//    label.numberOfLines = 1
//    label.textAlignment = .center
//    return label
//  }()
//
//  override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
//    super.init(style: style, reuseIdentifier: reuseIdentifier)
//
//    setLayout()
//  }
//
//  required init?(coder: NSCoder) {
//    fatalError("init(coder:) has not been implemented")
//  }
//
//  func configuration(number value: String) {
//    self.numberLabel.text = value
//  }
//
//  func setLayout() {
//    addSubview(numberLabel)
//
//    numberLabel.snp.makeConstraints { make in
//      make.centerX.centerY.equalToSuperview()
//      make.width.height.equalToSuperview()
//    }
//  }
// }
////
////struct TransitionNumberPreView: PreviewProvider {
////    static var previews: some View {
////        // Preview를 보고자 하는 ViewController를 넣으면 됩니다.
////      TransitionNumberView().toPreview()
////    }
////}
////
