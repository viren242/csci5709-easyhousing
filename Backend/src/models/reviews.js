module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define('Reviews', {
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        property_id: {
            type: DataTypes.INTEGER,
            required: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            required: true
        },
        review: {
            type: DataTypes.TEXT
        }
    });
    return Reviews;
}