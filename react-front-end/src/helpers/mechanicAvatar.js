const mechanicAvatar = (avatarAddress) => {
  switch (avatarAddress) {
    case "https://www.ziprecruiter.com/blog/zrs-0001/blog/wp-content/uploads/2017/07/auto_mechanic-628x418.jpg":
      return "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555290065/shape/mentalfloss/istock-486895782.jpg";
    case "https://cdn.trade-schools.net/static/graphics/auto-mechanic-top.jpg":
      return "https://images.wheels.ca/wp-content/uploads/2015/05/mechanic.jpg";
    default:
      return avatarAddress;
  }
}; 

export default mechanicAvatar;