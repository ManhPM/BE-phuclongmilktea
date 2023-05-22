"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Accounts", [
      {
        id_role: 1,
        username: "user",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 0,
        forgot: 0,
      },
      {
        id_role: 5,
        username: "admin1",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 3,
        username: "staff1",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 4,
        username: "shipper",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 1,
        username: "user1",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 4,
        username: "shipper1",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 5,
        username: "admin2",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 3,
        username: "staff2",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 2,
        username: "manager1",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
      {
        id_role: 2,
        username: "manager2",
        password: "$2a$10$pVN6f.l9WXqsQxifG89kTOewLKmN6BxXjFoqIUra5MIBcc6Z8yhtW",
        isActive: 1,
        forgot: 0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
