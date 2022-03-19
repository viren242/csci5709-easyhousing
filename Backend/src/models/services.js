module.exports = (sequelize, DataTypes) => {
    const Services = sequelize.define("Services", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        userid: {
            type: DataTypes.INTEGER,
        }
        
    });

    return Services;

};