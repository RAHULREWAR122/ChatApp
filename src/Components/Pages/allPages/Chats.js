import { useContext, useEffect, useState } from "react";
import style from "./chats.module.css";
import ChatsNav from "./ChatsNav";
import Messages from "./Messages";
import { ChatContext } from "../../../Context1/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../Firebase/auth";
import { AuthContext } from "../../../Context1/AuthContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Chats() {
  const [msgs, setMsgs] = useState([]);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { data } = useContext(ChatContext);
  const { currUser } = useContext(AuthContext);

  const handleSendMessage = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress tracking logic here
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currUser.uid,
                data: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currUser.uid,
          data: Timestamp.now(),
        }),
      });
     
    }

    await updateDoc(doc(db, "userChats", currUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".data"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".data"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  useEffect(() => {
    if (data.chatId) {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        if (doc.exists()) {
          setMsgs(doc.data().messages);
        }
      });
      return () => {
        unSub();
      };
    }
  }, [data.chatId]);

  
  return (
    <>
      <div className={style.Chats}>
        <ChatsNav />

        <div className={style.showChats}>
          <div className={style.msgs}>
            {msgs && msgs.map((x ,i)=>(
              <Messages message={x} key={i}/>
            ))
            }
            
          </div>
        </div>
        <div className={style.sendMsgs}>
          <input
            type="text"
            name=""
            id=""
            placeholder="type here Messages..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <div>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              id="file"
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1635/1635154.png"
                alt=""
              />
            </label>
            <img onClick={handleSendMessage}
              src="https://cdn-icons-png.flaticon.com/128/3608/3608124.png"
              alt=""
            />
            {/* <button onClick={handleSendMessage}>Send</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chats;
