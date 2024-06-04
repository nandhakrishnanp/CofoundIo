const User = require("../Model/userModel");

const updateProfile = async (req, res) => {

  const { profileUrl } = req.body;

  const userId = req.user.userId;

  const user = await User.findByIdAndUpdate(userId, {
    profileUrl: profileUrl,
  });

  if (!user) {
    res
      .json({
        msg: "Error While Updating Profile Img",
      })
      .status(400);
  } else {
    res
      .json({
        msg: "Profile Updated Successfully",
        profileUrl: profileUrl,
      })
      .status(200);
  }
};

const updateName = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;
  const user = await User.findByIdAndUpdate(userId, {
    name: name,
  });

  if (!user) {
    res
      .json({
        msg: "Error Updating name",
      })
      .status(400);
  } else {
    res
      .json({
        msg: "Name Updated Successfully",
        name: name,
      })
      .status(200);
  }
};

const updateBannerurl = async (req, res) => {
  const { bannerUrl } = req.body;
  const userId = req.user.userId;
  const user = await User.findByIdAndUpdate(userId, {
    BannerUrl: bannerUrl,
  });
  if (!user) {
    res
      .json({
        msg: "Error Updating Banner Url",
      })
      .status(400);
  } else {
    res
      .json({
        msg: "Banner Url Updated Successfully",
        bannerUrl: bannerUrl,
      })
      .status(200);
  }
};

const updateAbout = async(req, res) => {
  const { about } = req.body;
  console.log(about);
  const userId = req.user.userId;
  const user = await User.findByIdAndUpdate(userId, {
    about: about,
  });
  
  
  if (!user) {
    res
      .json({
        msg: "Error Updating About",
      })
      .status(400);
  } else {
    res
      .json({
        msg: "About Updated Successfully",
        
      })
      .status(200);
  }
};

const updatEmail = (req, res) => {
  const { Email } = req.body;
  const userId = req.user.userId;
  const user = User.findByIdAndUpdate(userId, {
    email: Email,
  });
  if (!user) {
    res
      .json({
        msg: "Error Updating About",
      })
      .status(400);
  } else {
    res
      .json({
        msg: "About Updated Successfully",
        email: Email,
      })
      .status(200);
  }
};



module.exports = { updateProfile, updatEmail, updateAbout, updateBannerurl , updateName};
