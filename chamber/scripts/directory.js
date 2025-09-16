// JSON data for members
const membersData = [
  {
    name: "Complete Computers And Technology Limited",
    address: "13, Adesuwa Girls Grammer School Road, Off Sapele Road, GRA Benin City, Nigeria",
    phone: "0803 353 5625",
    website: "https://cctechlimited.com",
    image: "https://cctechlimited.com/images/CCT-logo.png",
    membershipLevel: 3,
    description: "A global IT solutions corporation, providing innovative technology services and products.",
  },
  {
    name: "Home and Away Restaurant",
    address: "1 Ikpokpan Road, Off Sapele Road, GRA, Benin City, Nigeria",
    phone: "0803 980 4869",
    website: "https://homeandawayfoods.com",
    image: "https://homeandawayfoods.com/Frontend/assets/img/logo/logo2.2.png",
    membershipLevel: 2,
    description: "Best of casual dinning, Serving both local and continental delicacies",
  },
  {
    name: "Ken E. Mozia & Co (SAN) Law Firm",
    address: "G.R.A, Plot 87 A Okoro - Otun Avenue, off Ikpokpan Road, Benin City, Nigeria",
    phone: " 0703 361 9866",
    website: "https://www.facebook.com/Kenmoziasan",
    image: "https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-1/304926478_199992432372858_3426408245026535274_n.jpg?stp=c12.0.212.212a_dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=5sqn-WPak7IQ7kNvwHBrznD&_nc_oc=Adkobsc5S-4kEY64bkcCEFYONYKHI2Me2XKoI3ahj4OB2N7bdzzHTy6jvhl8Uyt6JN0&_nc_zt=24&_nc_ht=scontent-los2-1.xx&_nc_gid=k-HsSvbZ2FJfPZwe1tVD_g&oh=00_AfanyILsKDKgIssXHr29ZpcW_bjZezZIFIOBDZacIYcVPw&oe=68CEB506",
    membershipLevel: 2,
    description: "Full-service legal representation",
  },
  {
    name: "Benin Medical Care",
    address:
      "53 Adesuwa Grammar School Road, off Sapele Road, Benin City, Nigeria",
    phone: "0811 389 4440",
    website: "https://beninmedicalcare.com",
    image:
      "https://beninmedicalcare.com/wp-content/uploads/2025/06/cropped-logo-scaled-1.png",
    membershipLevel: 3,
    description:
      "A multi-specialty medical facility providing comprehensive healthcare services.",
  },
  {
    name: "Klinax Servicing Company",
    address: "18A - B, Upper Adesuwa Grammar School Rd, Benin City, Nigeria",
    phone: "0806 389 1337",
    website: "https://ng.infoaboutcompanies.com/Catalog/Edo/Benin-City/Laundry-Service/Klinax-Servicing-Co",
    image: "https://cdn.create.vista.com/api/media/small/36156413/stock-vector-janitor-cleaner-hold-mop-bucket-shield-retro",
    membershipLevel: 1,
    description: "Laundry and Cleaning services",
  },
  {
    name: "Phil HallMark Supermarket",
    address: "107 Benin Sapele Rd, Oka, Benin City, Nigeria",
    phone: " 0809 595 7574",
    website: "https://philhallmark.com",
    image: "https://philhallmark.com/production/wp-content/uploads/2022/02/PH-PRIMARY-LOGO.png",
    membershipLevel: 3,
    description: "Supermarket and General Merchandise",
  },
  {
    name: "Celebrity Fitness Gym",
    address:
      "1 Modupe Asemota Cl, Adesuwa Gram School Rd, Gra, Benin City, Nigeria",
    phone: "0810 729 4405",
    website: "https://www.instagram.com/celebrityfitnessng",
    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR0DwCUFBND_0Hvzoh5JN9S6Me0RKBOADpZ7HEPOdNZhFiCc3Oh",
    membershipLevel: 2,
    description: "Complete fitness and wellness center",
  },
  {
    name: "Access Bank",
    address: "81, Sapele Road, Benin City, Nigeria",
    phone: "07003000000",
    website: "https://www.accessbankplc.com",
    image: "https://www.accessbankplc.com/Content/images/access-lg-logo.png",
    membershipLevel: 3,
    description: "Local banking and financial services",
  }
];

// Function to display members
function displayMembers(viewType) {
  const directoryElement = document.getElementById("member-directory");
  directoryElement.innerHTML = "";
  directoryElement.className = `directory ${viewType}`;

  membersData.forEach((member) => {
    const card = document.createElement("div");
    card.className = "member-card";

    // Determine membership level text and class
    let membershipLevelText, membershipLevelClass;
    switch (member.membershipLevel) {
      case 1:
        membershipLevelText = "Member";
        membershipLevelClass = "level-1";
        break;
      case 2:
        membershipLevelText = "Silver";
        membershipLevelClass = "level-2";
        break;
      case 3:
        membershipLevelText = "Gold";
        membershipLevelClass = "level-3";
        break;
      default:
        membershipLevelText = "Member";
        membershipLevelClass = "";
    }

    card.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                        <p>${member.description}</p>
                        <span class="membership-level ${membershipLevelClass}">${membershipLevelText}</span>
                    </div>
                `;

    directoryElement.appendChild(card);
  });
}

// Toggle between grid and list views
document.getElementById("grid-view").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("list-view").classList.remove("active");
  displayMembers("grid");
});

document.getElementById("list-view").addEventListener("click", function () {
  this.classList.add("active");
  document.getElementById("grid-view").classList.remove("active");
  displayMembers("list");
});

// Set copyright year and last modified date
document.getElementById("copyright-year").textContent =
  new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Initialize the page with grid view
document.addEventListener("DOMContentLoaded", function () {
  displayMembers("grid");
});
