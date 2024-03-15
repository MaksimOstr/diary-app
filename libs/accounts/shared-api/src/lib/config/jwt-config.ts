export const jwtConfig = {
    token: {
        secret:
            process.env['JWT_SECRET'] ||
            'sjhdfjshfjskfjhrwjkthkjrhtejhjfhguiweyrtenfgjhbndfjgkher',
        expiresIn: process.env['JWT_EXP'] || '600s',
    },
    refresh: {
        secret: 
            process.env['JWT_REFRESH_SECRET'] ||
            'dsfsfskjflsdjflkdsjoweiruwoieurdskfsjfklsjwioeur',
        expiresIn: process.env['JWT_REFRESH_EXP'] || '10800s',
    }
}