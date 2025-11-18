package br.com.oiti.rnliveness3d

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

class RnLiveness3dPackage : BaseReactPackage() {
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == RnLiveness3dModule.NAME) {
      RnLiveness3dModule(reactContext)
    } else {
      null
    }
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      moduleInfos[RnLiveness3dModule.NAME] = ReactModuleInfo(
        RnLiveness3dModule.NAME,
        RnLiveness3dModule.NAME,
        false,
        false,
        false,
        true
      )
      moduleInfos
    }
  }
}
