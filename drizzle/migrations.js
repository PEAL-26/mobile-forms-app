// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_spotty_switch.sql';
import m0001 from './0001_tranquil_maelstrom.sql';
import m0002 from './0002_abnormal_master_mold.sql';
import m0003 from './0003_bent_raider.sql';
import m0004 from './0004_productive_hydra.sql';
import m0005 from './0005_peaceful_carnage.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005
    }
  }
  