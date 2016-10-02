{
  "rules": {
    ".read": true,
    "event_related":{
      "event":{
        "$event_id":{
          ".write":"auth!=null && (
          	(!data.exists()) ||
          	((data.exists() && !newData.exists()) &&
            	(data.child('created_by').val()==auth.uid && !data.child('participants').exists())) || 
            (data.exists() && newData.exists())
          )
          ",
          ".validate": "(newData.exists() && newData.hasChildren(['title','created_by','date'])) || 
          							!newData.exists()",
          "participants":{
            "$uid":{
            	".validate": "$uid == auth.uid"      
            }
          },
          "date":{
            ".validate":
            	"!data.exists() ||
              (
              	data.exists() && 
                (data.parent().child('participants').exists() == false) && 
                (data.parent().child('created_by').val() === auth.uid)
              )"
          }
        }
      }
    },
    "users":{
      "$uid":{
        ".write": "$uid == auth.uid"
      }
    }
  }
}