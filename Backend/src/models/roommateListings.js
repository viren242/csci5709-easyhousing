module.exports = (sequelize, DataTypes) => {
    const roommateListings = sequelize.define("roommateListings", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        postedBy: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        imageUrl: {
            type: DataTypes.STRING
        }
        
    });

    return roommateListings;

};