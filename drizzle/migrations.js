// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_spotty_switch.sql';
import m0001 from './0001_tranquil_maelstrom.sql';
import m0002 from './0002_abnormal_master_mold.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002
    }
  }
  