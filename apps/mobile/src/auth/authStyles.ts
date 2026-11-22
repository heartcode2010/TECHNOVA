import { theme } from "@/theme";
import { StyleSheet } from "react-native";
export const authStyles=StyleSheet.create({
 page:{flex:1,backgroundColor:theme.colors.paper},body:{padding:22,paddingBottom:40},
 eyebrow:{fontSize:10,fontWeight:"900",letterSpacing:1.5,color:theme.colors.accent},
 title:{fontSize:28,lineHeight:34,fontWeight:"900",color:theme.colors.ink,marginTop:12},
 copy:{fontSize:13,lineHeight:20,color:theme.colors.muted,marginTop:8,marginBottom:18},
 label:{fontSize:10,fontWeight:"900",letterSpacing:1,color:theme.colors.muted,marginBottom:7,marginTop:12},
 input:{backgroundColor:theme.colors.surface,borderWidth:1,borderColor:theme.colors.line,borderRadius:12,padding:14,fontSize:14,color:theme.colors.ink},
 button:{backgroundColor:theme.colors.ink,padding:15,borderRadius:12,alignItems:"center",marginTop:18},
 buttonText:{fontSize:12,fontWeight:"900",color:"#fff"},disabled:{opacity:.4},
 error:{fontSize:11,color:"#A33F32",marginTop:10},success:{fontSize:12,lineHeight:18,color:theme.colors.green,marginTop:10},
 link:{fontSize:12,fontWeight:"900",color:theme.colors.accent,marginTop:16},
 notice:{backgroundColor:theme.colors.amberSoft,borderRadius:13,padding:13,marginBottom:16},
 noticeTitle:{fontSize:12,fontWeight:"900",color:theme.colors.amber},noticeText:{fontSize:11,lineHeight:17,color:theme.colors.ink,marginTop:5},
 card:{backgroundColor:theme.colors.surface,borderWidth:1,borderColor:theme.colors.line,borderRadius:16,padding:18}
});