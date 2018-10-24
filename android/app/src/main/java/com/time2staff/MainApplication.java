package com.time2staff;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.heanoria.library.reactnative.locationenabler.RNAndroidLocationEnablerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.imagepicker.ImagePickerPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.airbnb.android.react.maps.MapsPackage;

import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import io.branch.referral.Branch;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;


public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SnackbarPackage(),
            new RNAndroidLocationEnablerPackage(),

            new RNGoogleSigninPackage(),
            new ImagePickerPackage(),
            new ReactNativeDocumentPicker(),
            
            new RNBranchPackage(),
            new VectorIconsPackage(),
            new FBSDKPackage(getCallbackManager()),
            new MapsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
    Branch.getAutoInstance(this);

    SoLoader.init(this, /* native exopackage */ false);
  }
}
