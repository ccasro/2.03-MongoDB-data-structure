// **************** OPTICS
db = db.getSiblingDB('optics');

db.createCollection('providers');
db.createCollection('glasses', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        frame_type: {
          bsonType: "string",
          enum: ["rimless", "plastic", "metallic"]
        }
      }
    }
  }
});
db.createCollection('clients');
db.createCollection('employees');
db.createCollection('sales');

db.providers.insertMany([
  {
    name: "Central Optics",
    address: {
      street: "Moon Street",
      number: "123",
      floor: "2",
      door: "B",
      city: "Barcelona",
      postal_code: "08001",
      country: "Spain"
    },
    phone: "+34 931 234 567",
    fax: "+34 931 234 568",
    tax_id: "B12345678"
  },
  {
    name: "Vision Plus",
    address: {
      street: "Gran Via",
      number: "45",
      floor: "1",
      door: "A",
      city: "Madrid",
      postal_code: "28013",
      country: "Spain"
    },
    phone: "+34 912 345 678",
    fax: "+34 912 345 679",
    tax_id: "B87654321"
  }
]);

db.glasses.insertMany([
  {
    brand: "Ray-Ban",
    graduation: { left: -1.00, right: -1.25 },
    glass_color: { left: "gray", right: "gray" },
    frame_type: "plastic",
    frame_color: "black",
    price: 120,
    provider_id: db.providers.findOne({ name: "Central Optics" })._id
  },
  {
    brand: "Oakley",
    graduation: { left: -0.50, right: -0.75 },
    glass_color: { left: "blue", right: "blue" },
    frame_type: "metallic",
    frame_color: "silver",
    price: 150,
    provider_id: db.providers.findOne({ name: "Vision Plus" })._id
  }
]);

db.clients.insertMany([
  {
    name: "Anna Lopez",
    address: "Sun Street, 45, 3rd 2B, Barcelona, 08005, Spain",
    phone: "+34 600 123 456",
    email: "anna@email.com",
    registration_date: new Date("2025-11-11T10:30:00Z"),
    referred_by: null
  },
  {
    name: "Marc Perez",
    address: "Gran Via, 99, 2nd 1A, Madrid, 28013, Spain",
    phone: "+34 611 987 654",
    email: "marc@email.com",
    registration_date: new Date("2025-10-20T09:00:00Z"),
    referred_by: db.clients.findOne({ name: "Anna Lopez" })?._id || null
  }
]);

db.employees.insertMany([
  { name: "Carlos Garcia", position: "Salesperson" },
  { name: "Lucia Torres", position: "Manager" }
]);

db.sales.insertMany([
  {
    datetime: new Date("2025-11-11T11:00:00Z"),
    client_id: db.clients.findOne({ name: "Anna Lopez" })._id,
    employee_id: db.employees.findOne({ name: "Carlos Garcia" })._id,
    glasses: [
      {
        glasses_id: db.glasses.findOne({ brand: "Ray-Ban" })._id,
        quantity: 1,
        unit_price: 120
      }
    ]
  }
]);

//************** FOOD_DELIVERY
db = db.getSiblingDB('food_delivery');

db.createCollection('clients');
db.createCollection('stores');
db.createCollection('employees', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        role: {
          bsonType: "string",
          enum: ["chef", "delivery"],
          description: "Allowed values: chef or delivery"
        }
      }
    }
  }
});
db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        category: {
          bsonType: "string",
          enum: ["pizza","burger","drink"],
          description: "Allowed values: pizza, burger, drink"
        },
        sub_category: {
          bsonType: "string",
          description: "Optional sub-category for pizzas"
        }
      }
    }
  }
});
db.createCollection('orders', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        delivery_type: {
          bsonType: "string",
          enum: ["home_delivery", "store_pickup"],
          description: "Allowed values: home_delivery or store_pickup"
        }
      }
    }
  }
});

db.clients.insertMany([
  {
    first_name: "John",
    last_name: "Doe",
    address: "123 Elm Street",
    postal_code: "08001",
    city: "Barcelona",
    province: "Barcelona",
    phone: "+34 600 123 456"
  },
  {
    first_name: "Anna",
    last_name: "Smith",
    address: "45 Sun Street",
    postal_code: "28013",
    city: "Madrid",
    province: "Madrid",
    phone: "+34 611 987 654"
  }
]);

db.stores.insertMany([
  {
    address: "10 Pizza Avenue",
    postal_code: "08002",
    city: "Barcelona",
    province: "Barcelona"
  },
  {
    address: "20 Burger Street",
    postal_code: "28014",
    city: "Madrid",
    province: "Madrid"
  }
]);

db.employees.insertMany([
  {
    first_name: "Carlos",
    last_name: "Garcia",
    nif: "B12345678",
    phone: "+34 912 345 678",
    role: "chef",
    store_id: db.stores.findOne({ city: "Barcelona" })._id
  },
  {
    first_name: "Lucia",
    last_name: "Torres",
    nif: "B87654321",
    phone: "+34 911 234 567",
    role: "delivery",
    store_id: db.stores.findOne({ city: "Barcelona" })._id
  },
  {
    first_name: "Mario",
    last_name: "Lopez",
    nif: "B23456789",
    phone: "+34 910 123 456",
    role: "chef",
    store_id: db.stores.findOne({ city: "Madrid" })._id
  },
  {
    first_name: "Sara",
    last_name: "Jimenez",
    nif: "B98765432",
    phone: "+34 913 987 654",
    role: "delivery",
    store_id: db.stores.findOne({ city: "Madrid" })._id
  }
]);

db.products.insertMany([
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato and mozzarella",
    image: "margherita.jpg",
    price: 8.5,
    category: "pizza",
    sub_category: "classic"
  },
  {
    name: "Pepperoni Pizza",
    description: "Pizza with pepperoni and cheese",
    image: "pepperoni.jpg",
    price: 9.5,
    category: "pizza",
    sub_category: "extreme"
  },
  {
    name: "Cheeseburger",
    description: "Beef burger with cheese, lettuce, tomato",
    image: "cheeseburger.jpg",
    price: 6.0,
    category: "burger"
  },
  {
    name: "Cola Drink",
    description: "Carbonated soft drink",
    image: "cola.jpg",
    price: 2.0,
    category: "drink"
  }
]);

db.orders.insertMany([
  {
    order_datetime: new Date("2025-11-13T12:30:00Z"),
    delivery_type: "home_delivery",
    total_price: 17.0,
    note: "Leave at the door",
    client_id: db.clients.findOne({ first_name: "John", last_name: "Doe" })._id,
    store_id: db.stores.findOne({ city: "Barcelona" })._id,
    delivery_employee_id: db.employees.findOne({ first_name: "Lucia", last_name: "Torres" })._id,
    order_items: [
      {
        product_id: db.products.findOne({ name: "Margherita Pizza" })._id,
        quantity: 1,
        unit_price: 8.5
      },
      {
        product_id: db.products.findOne({ name: "Cola Drink" })._id,
        quantity: 1,
        unit_price: 2.0
      }
    ]
  },
  {
    order_datetime: new Date("2025-11-13T13:00:00Z"),
    delivery_type: "store_pickup",
    total_price: 15.5,
    note: "Extra cheese",
    client_id: db.clients.findOne({ first_name: "Anna", last_name: "Smith" })._id,
    store_id: db.stores.findOne({ city: "Madrid" })._id,
    delivery_employee_id: null,
    order_items: [
      {
        product_id: db.products.findOne({ name: "Pepperoni Pizza" })._id,
        quantity: 1,
        unit_price: 9.5
      },
      {
        product_id: db.products.findOne({ name: "Cheeseburger" })._id,
        quantity: 1,
        unit_price: 6.0
      }
    ]
  }
]);

//************** YOUTUBE
db = db.getSiblingDB('youtube');

db.createCollection("users");
db.createCollection("videos", {
 validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        type: {
          enum: ["like", "dislike"],
          description: "Only type like or dislike"
        }
      }
    }
  }
});
db.createCollection("channels");
db.createCollection("likes_dislikes", {
  validator: {
    $jsonSchema: {
          bsonType: "object",
          properties: {
            status: {
              enum: ["public", "private", "occult"],
              description: "The status only can be public, private or occult"
            }
          }
        }
      }
    });

//to prevent a user from giving more than one like
db.likes_dislikes.createIndex(
  { video_id: 1, user_id: 1 },
  { unique: true }
);

db.createCollection("subscriptions");
db.createCollection("playlists", {
 validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        status: {
          enum: ["public", "private"],
          description: "The status only can be public or private"
        }
      }
    }
  }
});
db.createCollection("comments");



const users = db.users.insertMany([
  {
    email: "john.doe@example.com",
    password: "hashed_password_123",
    username: "JohnD",
    birthdate: ISODate("1990-05-12T00:00:00Z"),
    gender: "male",
    country: "United States",
    postal_code: "90210"
  },
  {
    email: "sarah.miller@example.com",
    password: "hashed_password_456",
    username: "SarahM",
    birthdate: ISODate("1988-11-02T00:00:00Z"),
    gender: "female",
    country: "Canada",
    postal_code: "A1B2C3"
  }
]).insertedIds;

const john = users[0];
const sarah = users[1];

const channels = db.channels.insertMany([
  {
    name: "Tech Insights",
    description: "Technology reviews, tutorials, and industry news.",
    created_at: ISODate("2023-01-14T10:23:00Z"),
    owner_user_id: john
  },
  {
    name: "Daily Fitness",
    description: "Workout routines, nutrition tips, and healthy lifestyle guidance.",
    created_at: ISODate("2023-04-08T16:45:00Z"),
    owner_user_id: sarah
  }
]).insertedIds;

const tech_insights = channels[0];
const daily_fitness = channels[1];

const videos = db.videos.insertMany([
  {
    title: "How to Build a Gaming PC",
    description: "A detailed guide on assembling a high-performance gaming computer.",
    size_mb: 820,
    filename: "gaming_pc_build.mp4",
    duration_seconds: 1320,
    thumbnail: "thumb_pcbuild.png",
    views: 15420,
    likes: 890,
    dislikes: 12,
    status: "public",
    tags: ["technology", "gaming", "tutorial"],
    uploaded_at: ISODate("2023-05-20T13:15:00Z"),
    user_id: john
  },
  {
    title: "10-Minute Morning Workout",
    description: "A quick morning routine to boost your energy for the day.",
    size_mb: 420,
    filename: "morning_workout.mp4",
    duration_seconds: 600,
    thumbnail: "thumb_workout.png",
    views: 9720,
    likes: 640,
    dislikes: 5,
    status: "public",
    tags: ["fitness", "health", "workout"],
    uploaded_at: ISODate("2023-06-01T08:30:00Z"),
    user_id: sarah
  }
]).insertedIds;

const video_pc = videos[0];
const video_workout = videos[1];

db.likes_dislikes.insertMany([
  {
    video_id: video_pc,
    user_id: sarah,
    type: "like",
    created_at: ISODate("2023-06-01T09:12:00Z")
  },
  {
    video_id: video_workout,
    user_id: john,
    type: "dislike",
    created_at: ISODate("2023-06-02T14:45:00Z")
  }
]);

db.subscriptions.insertMany([
  {
    user_id: john,
    channel_id: daily_fitness,
    subscribed_at: ISODate("2023-06-10T11:00:00Z")
  },
  {
    user_id: sarah,
    channel_id: tech_insights,
    subscribed_at: ISODate("2023-07-05T17:22:00Z")
  }
]);

db.playlists.insertMany([
  {
    name: "My Favorite Tech Videos",
    created_at: ISODate("2023-07-18T10:00:00Z"),
    status: "public",
    user_id: john,
    video_ids: [video_pc, video_workout]
  },
  {
    name: "Morning Routine",
    created_at: ISODate("2023-08-01T06:30:00Z"),
    status: "private",
    user_id: sarah,
    video_ids: [video_workout]
  }
]);

db.comments.insertMany([
  {
    video_id: video_pc,
    user_id: sarah,
    text: "Great video! Very helpful, thanks!",
    created_at: ISODate("2023-06-01T10:05:00Z")
  },
  {
    video_id: video_workout,
    user_id: john,
    text: "Awesome content. Keep it up!",
    created_at: ISODate("2023-06-02T15:22:00Z")
  }
]);

