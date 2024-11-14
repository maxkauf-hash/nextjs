export const ProductsModelFields = {
  modelName: "Products",
  fields: [
    {
      name: "name",
      type: "String",
      isRequired: true,
    },
    {
      name: "description",
      type: "String",
      isRequired: true,
    },
    {
      name: "price",
      type: "Float",
      isRequired: true,
    },
    {
      name: "photo",
      type: "String",
      isRequired: true,
    },
    {
      name: "quantity",
      type: "Int",
      isRequired: true,
    },
    {
      name: "creationTimestamp",
      type: "DateTime",
      isRequired: false,
    },
  ]
};

export const UsersModelFields = {
  modelName: "Users",
  fields: [
    {
      name: "firstName",
      type: "String",
      isRequired: true,
    },
    {
      name: "lastName",
      type: "String",
      isRequired: true,
    },
    {
      name: "email",
      type: "String",
      isRequired: true,
    },
    {
      name: "password",
      type: "String",
      isRequired: true,
    },
    {
      name: "role",
      type: "String",
      isRequired: false,
    },
    {
      name: "address",
      type: "String",
      isRequired: true,
    },
    {
      name: "zip",
      type: "String",
      isRequired: true,
    },
    {
      name: "city",
      type: "String",
      isRequired: true,
    },
    {
      name: "phone",
      type: "String",
      isRequired: true,
    },
    {
      name: "creationTimestamp",
      type: "DateTime",
      isRequired: false,
    },
    {
      name: "connexionTimestamp",
      type: "DateTime",
      isRequired: false,
    },
    {
      name: "email_verified",
      type: "Boolean",
      isRequired: false,
    },
  ]
};

export const OrdersModelFields = {
  modelName: "Orders",
  fields: [
    {
      name: "userId",
      type: "String",
      isRequired: true,
    },
    {
      name: "totalAmount",
      type: "Float",
      isRequired: true,
    },
    {
      name: "creationTimestamp",
      type: "DateTime",
      isRequired: false,
    },
    {
      name: "status",
      type: "String",
      isRequired: true,
    },
  ]
};

export const OrderDetailsModelFields = {
  modelName: "OrderDetails",
  fields: [
    {
      name: "orderId",
      type: "String",
      isRequired: true,
    },
    {
      name: "productId",
      type: "String",
      isRequired: true,
    },
    {
      name: "quantity",
      type: "Int",
      isRequired: true,
    },
    {
      name: "total",
      type: "Float",
      isRequired: true,
    },
  ]
};

export const SessionModelFields = {
  modelName: "Session",
  fields: [
    {
      name: "expiresAt",
      type: "DateTime",
      isRequired: true,
    },
    {
      name: "userId",
      type: "String",
      isRequired: true,
    },
  ]
};

