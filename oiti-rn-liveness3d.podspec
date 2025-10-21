require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "oiti-rn-liveness3d"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/oititec/rn-liveness3d.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"

  s.ios.dependency 'OILiveness3D', '3.8.0'
  s.ios.dependency 'RnLiveness3dSwift', '0.1.0'

  install_modules_dependencies(s)
end