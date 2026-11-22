import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import { theme } from "@/theme";

const guides = [
  {id:"internet",name:"Internet is not working",device:"Phone / Wi-Fi",steps:["Check whether another trusted app or website can connect.","Turn Wi-Fi off and on once, then wait 20 seconds.","If other devices are also offline, check the router's power and connection lights.","If only this phone is affected, restart the phone and test again."]},
  {id:"slow",name:"My phone is very slow",device:"Android phone",steps:["Close apps you are not using and wait a moment.","Check available storage in Settings. Do not delete files you cannot replace.","Restart the phone normally.","Install pending system and app updates when you have a stable connection and enough battery."]},
  {id:"crash",name:"An app keeps closing",device:"Android phone",steps:["Check whether the app has an update in the official app store.","Restart the app and then restart the phone if needed.","Check whether the phone has enough free storage.","If the issue began after an update, note the app version and exact error before contacting support."]},
  {id:"charging",name:"My phone is not charging",device:"Phone / charger",steps:["Check the wall socket using a different safe appliance if available.","Inspect the cable and adapter for visible damage; stop using damaged accessories.","Try a known-good compatible charger and cable.","Check the charging port for visible debris without inserting metal objects or liquids."]},
  {id:"laptop",name:"My laptop will not connect to Wi-Fi",device:"Windows / laptop",steps:["Confirm Wi-Fi is switched on and airplane mode is off.","Test another device on the same network before changing laptop settings.","Restart the laptop and router if other devices are also affected.","Record any exact Windows error message before trying advanced settings."]}
];
export default function FixItScreen(){
 const [selected,setSelected]=useState("internet");
 const [done,setDone]=useState<number[]>([]);
 const guide=useMemo(()=>guides.find(g=>g.id===selected)!,[selected]);
 return <ScrollView style={s.page} contentContainerStyle={s.body}>
  <Text style={s.eyebrow}>FIXIT / OFFLINE GUIDE</Text>
  <Text style={s.title}>Let's troubleshoot safely.</Text>
  <Text style={s.copy}>Choose the closest problem and work through the reversible checks first. No reset, data deletion or risky commands are included.</Text>
  <Text style={s.label}>WHAT IS GOING WRONG?</Text>
  {guides.map(g=><Pressable key={g.id} onPress={()=>{setSelected(g.id);setDone([])}} style={[s.option,selected===g.id&&s.optionActive]}><View style={s.optionText}><Text style={s.optionName}>{g.name}</Text><Text style={s.optionDevice}>{g.device}</Text></View><Text style={s.optionMark}>{selected===g.id?"●":"○"}</Text></Pressable>)}
  <View style={s.guideHead}><Text style={s.guideEyebrow}>YOUR CHECKLIST</Text><Text style={s.guideTitle}>{guide.name}</Text><Text style={s.progress}>{done.length} of {guide.steps.length} checks completed</Text></View>
  {guide.steps.map((step,i)=><Pressable key={guide.id + "-" + i} onPress={()=>setDone(old=>old.includes(i)?old.filter(x=>x!==i):[...old,i])} style={s.step}><View style={[s.check,done.includes(i)&&s.checked]}>{done.includes(i)&&<Text style={s.tick}>✓</Text>}</View><Text style={[s.stepText,done.includes(i)&&s.stepDone]}>{step}</Text></Pressable>)}
  <Pressable onPress={()=>setDone([])} style={s.reset}><Text style={s.resetText}>Reset checklist</Text></Pressable>
  <View style={s.safety}><Text style={s.safetyTitle}>Stop if a step feels unsafe</Text><Text style={s.safetyText}>Do not open a device, bypass security, install unknown apps or run commands from strangers. Factory resets and data deletion require a verified backup and explicit confirmation.</Text></View>
  <Text style={s.footer}>This guide works offline. Your checklist is temporary and is not yet saved to a TECHNOVA account or support case.</Text>
 </ScrollView>;
}
const s=StyleSheet.create({
 page:{flex:1,backgroundColor:theme.colors.paper},body:{padding:22,paddingBottom:42},eyebrow:{fontSize:10,fontWeight:"900",letterSpacing:1.8,color:theme.colors.accent},title:{fontSize:30,lineHeight:36,fontWeight:"900",color:theme.colors.ink,marginTop:10},copy:{fontSize:13,lineHeight:21,color:theme.colors.muted,marginTop:10,marginBottom:20},label:{fontSize:10,fontWeight:"900",letterSpacing:1,color:theme.colors.muted,marginBottom:8},
 option:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",backgroundColor:theme.colors.surface,borderWidth:1,borderColor:theme.colors.line,borderRadius:13,padding:13,marginBottom:8},optionActive:{borderColor:theme.colors.accent,backgroundColor:theme.colors.accentSoft},optionText:{flex:1},optionName:{fontSize:12,fontWeight:"800",color:theme.colors.ink},optionDevice:{fontSize:10,color:theme.colors.muted,marginTop:4},optionMark:{fontSize:16,color:theme.colors.accent,paddingLeft:12},
 guideHead:{backgroundColor:theme.colors.ink,borderRadius:16,padding:16,marginTop:18,marginBottom:8},guideEyebrow:{fontSize:9,fontWeight:"900",letterSpacing:1,color:"#E5A58D"},guideTitle:{fontSize:16,fontWeight:"900",color:"#fff",marginTop:7},progress:{fontSize:10,color:"#D2D9D3",marginTop:6},
 step:{flexDirection:"row",alignItems:"flex-start",gap:11,paddingVertical:14,borderBottomWidth:1,borderBottomColor:theme.colors.line},check:{width:22,height:22,borderRadius:7,borderWidth:1.5,borderColor:theme.colors.muted,alignItems:"center",justifyContent:"center",marginTop:1},checked:{backgroundColor:theme.colors.green,borderColor:theme.colors.green},tick:{fontSize:13,fontWeight:"900",color:"#fff"},stepText:{flex:1,fontSize:12,lineHeight:19,color:theme.colors.ink},stepDone:{color:theme.colors.muted,textDecorationLine:"line-through"},
 reset:{alignSelf:"flex-start",paddingVertical:12},resetText:{fontSize:11,fontWeight:"800",color:theme.colors.accent},safety:{backgroundColor:theme.colors.amberSoft,borderRadius:14,padding:15,marginTop:12},safetyTitle:{fontSize:12,fontWeight:"900",color:theme.colors.amber},safetyText:{fontSize:11,lineHeight:17,color:theme.colors.ink,marginTop:5},footer:{fontSize:10,lineHeight:16,color:theme.colors.muted,marginTop:16}
});