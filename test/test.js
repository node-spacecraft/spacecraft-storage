const Spacecraft = require('spacecraft');
const Storage = require('../');

describe('storage', () => {
  let spacecraft;
  let User;
  beforeAll(() => {
    spacecraft = new Spacecraft();
    spacecraft.mount(new Storage());
    spacecraft.run();

    User = spacecraft.storage.define('user', {
      firstName: {
        type: Storage.STRING
      },
      lastName: {
        type: Storage.STRING
      },
      sex: {
        type: Storage.STRING
      },
      info: {
        type: Storage.JSON
      },
      info2: {
        type: Storage.STRING
      },
    });
  })

  test('connect', async () => {
    await spacecraft.storage.authenticate();
  })

  test('set model', async () => {
    // force: true will drop the table if it already exists
    await User.sync({force: true});
    let result = await User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });

    expect(result.firstName).toBe('John');
    expect(result.lastName).toBe('Hancock');
  })

  test('find all', async () => {
    let users = await User.findAll();
    expect(users.length).toBe(1);
  })

  test('set data', async () => {
    let res = await User.update({
      info: {
        a:1,
        b:"str"
      },
    }, {
      where: {
        firstName: 'John'
      }
    })

    let tmp = await User.findAll({
      where: {
        firstName: 'John'
      }
    })

    expect(tmp[0].info.a).toBe(1);
    expect(tmp[0].info.b).toBe("str");
    expect(typeof tmp[0].info).toBe("object");

    tmp[0].sex = 'female';
    let tmp2 = await tmp[0].save();

    expect(tmp2.sex).toBe('female');
  })
})
