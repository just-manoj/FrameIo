import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import { CommentData, DrawingData } from '../modal/VideoPlayer';

enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    { name: 'FrameIo.db', location: 'default' },
    () => {},
    (error: any) => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const commentsQuery = `
    CREATE TABLE IF NOT EXISTS Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cmdTime TEXT,
    timeStamp TEXT,
    comment TEXT,
    drawing INTEGER
    );
  `;
  const drawingQuery = `
   CREATE TABLE IF NOT EXISTS Drawing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      colorCode TEXT,
      points TEXT
   )
  `;
  try {
    await db.executeSql(commentsQuery);
    await db.executeSql(drawingQuery);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
};

export const geAllCommentsDb = async (
  db: SQLiteDatabase,
): Promise<CommentData[]> => {
  try {
    const comments: CommentData[] = [];
    const results = await db.executeSql('SELECT * FROM Comments');
    results?.forEach(async result => {
      for (let index = 0; index < result.rows.length; index++) {
        const res = result.rows.item(index);
        let points = null;
        if (res.drawing > 0) {
          points = await getDrawingdataDb(db, res.drawing);
        }
        comments.push({
          id: res.id,
          cmdTime: res.cmdTime,
          command: res.comment,
          timestamp: res.timeStamp,
          drawing: points && points.id > 0 ? points : null,
        });
      }
    });
    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getDrawingdataDb = async (
  db: SQLiteDatabase,
  id: number,
): Promise<DrawingData | null> => {
  if (id < 0) {
    return null;
  }
  try {
    let drawing: DrawingData = {
      id: -1,
      colorCode: '',
      points: [],
    };
    const results = await db.executeSql(
      `SELECT * FROM Drawing where id = ${id}`,
    );
    drawing = {
      id: id,
      colorCode: results[0].rows.item(0).colorCode,
      points: JSON.parse(results[0].rows.item(0).points),
    };
    return drawing;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get comments from database');
  }
};

export const addCommand = async (db: SQLiteDatabase, command: CommentData) => {
  let insertDrawingId = -1;
  if (command.drawing?.points && command.drawing?.points.length > 0) {
    const insertQuery = `
   INSERT INTO Drawing (colorCode, points)
   VALUES (?, ?);
 `;
    const values = [
      command.drawing.colorCode,
      JSON.stringify(command.drawing.points),
    ];

    try {
      const insertDrawingResult = await db.executeSql(insertQuery, values);
      insertDrawingId = insertDrawingResult[0].insertId;
    } catch (error) {
      console.error(error);
      throw Error('Failed to add drawing points');
    }
  }
  const insertQuery = `
     INSERT INTO Comments (cmdTime, timeStamp, comment, drawing)
     VALUES (?, ?, ?, ?);
   `;
  const values = [
    command.cmdTime,
    command.timestamp,
    command.command,
    insertDrawingId,
  ];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.log(error);
    throw Error('Failed to add contact');
  }
};

export const deleteCommentDb = async (db: SQLiteDatabase, id: number) => {
  try {
    const results = await db.executeSql(
      `SELECT drawing FROM Comments WHERE id = ?`,
      [id],
    );

    if (results[0].rows.length > 0) {
      const drawingId = results[0].rows.item(0).drawing;
      if (drawingId > 0) {
        await deleteDrawingDb(db, drawingId);
      }
    }

    return db.executeSql(`DELETE FROM Comments WHERE id = ?`, [id]);
  } catch (error) {
    console.error('Failed to delete comment', error);
    throw Error('Failed to delete comment from database');
  }
};

export const deleteDrawingDb = async (db: SQLiteDatabase, id: number) => {
  try {
    return db.executeSql(`DELETE FROM Drawing WHERE id = ?`, [id]);
  } catch (error) {
    console.error('Failed to delete drawing', error);
    throw Error('Failed to delete drawing from database');
  }
};
