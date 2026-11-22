import { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { modules } from "@/data/modules";
import { useAuth } from "@/auth/AuthContext";
import { theme } from "@/theme";
const featured = ["nova","scanner","cyber-academy","scamshield","fixit","opportunity-radar","portfolio"];
function Tag({children,soft=false}:{children:string;soft?:boolean}) { return <View style={[s.tag,soft&&s.tagSoft]}><Text style={[s.tagText,soft&&s.tagTextSoft]}>{children}</Text></View>; }
export default function HomeScreen() {
  const {user}=useAuth();
  const [query,setQuery] = useState("");
  const results = useMemo(()=>modules.filter(m=>m.name.toLowerCase().includes(query.toLowerCase())||m.description.toLowerCase().includes(query.toLowerCase())),[query]);
  return <SafeAreaView edges={["top"]} style={{flex:1,backgroundColor:theme.colors.paper}}><ScrollView style={s.page} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
    <View style={s.top}><View><Text style={s.brand}>TECHNOVA</Text><Text style={s.brandSub}>BY HEARTCODE TECHNOLOGIES</Text></View><Link href="/profile" asChild><Pressable style={s.avatar}><Text style={s.avatarText}>{user?.name?.charAt(0).toUpperCase() ?? "G"}</Text></Pressable></Link></View>
    <View style={s.hero}><Tag>YOUR DIGITAL ADVANTAGE</Tag><Text style={s.heroTitle}>Make technology{"\n"}<Text style={s.heroAccent}>work for you.</Text></Text><Text style={s.heroCopy}>Protect your digital life. Build practical skills. Find opportunities. Turn what you know into real outcomes.</Text><Text style={s.heroFoot}>LEARN  ·  PROTECT  ·  BUILD  ·  EARN</Text></View>
    <View style={s.sectionHead}><Text style={s.sectionTitle}>Start with what you need</Text><Text style={s.sectionHint}>QUICK ACCESS</Text></View>
    <View style={s.quickGrid}>
      {featured.map((slug,i)=>{const m=modules.find(x=>x.slug===slug)!;return <Link key={slug} href={{pathname:"/module/[slug]",params:{slug}}} asChild><Pressable style={s.quickCard}><Text style={s.quickGlyph}>{["✦","◈","▤","!","⌁","↗","▣"][i]}</Text><Text style={s.quickName}>{m.name}</Text><Text style={s.quickDesc}>{m.description}</Text><Text style={s.open}>OPEN  ↗</Text></Pressable></Link>;})}
    </View>
    <View style={s.sectionHead}><Text style={s.sectionTitle}>Explore TECHNOVA</Text><Tag soft>{String(modules.length) + " SERVICES"}</Tag></View>
    <TextInput value={query} onChangeText={setQuery} placeholder="Search tools, learning, business…" placeholderTextColor={theme.colors.muted} style={s.search} />
    <FlatList scrollEnabled={false} data={results} keyExtractor={item=>item.slug} renderItem={({item})=><Link href={{pathname:"/module/[slug]",params:{slug:item.slug}}} asChild><Pressable style={s.listRow}><View style={s.listIcon}><Text style={s.listGlyph}>{item.pillar==="PROTECT"?"◈":item.pillar==="LEARN"?"▤":item.pillar==="EARN"?"↗":"⌘"}</Text></View><View style={{flex:1}}><Text style={s.listName}>{item.name}</Text><Text style={s.listDesc}>{item.description}</Text></View><Text style={s.chevron}>›</Text></Pressable></Link>} ListEmptyComponent={<Text style={s.empty}>No services match that search.</Text>} />
    <View style={s.footer}><Text style={s.footerTitle}>Built for Nigerian realities.</Text><Text style={s.footerCopy}>Low-data by design. Naira-first. Ready to grow beyond Nigeria.</Text></View>
  </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({
 page:{flex:1,backgroundColor:theme.colors.paper},content:{padding:20,paddingBottom:36},
 top:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:24},
 brand:{fontSize:19,fontWeight:"900",letterSpacing:2,color:theme.colors.ink},brandSub:{fontSize:8,fontWeight:"800",letterSpacing:1.3,color:theme.colors.muted,marginTop:3},
 avatar:{width:38,height:38,borderRadius:19,backgroundColor:theme.colors.ink,alignItems:"center",justifyContent:"center"},avatarText:{color:"#fff",fontWeight:"800"},
 hero:{backgroundColor:theme.colors.ink,borderRadius:22,padding:23,marginBottom:28},
 tag:{alignSelf:"flex-start",backgroundColor:"#34443D",paddingHorizontal:10,paddingVertical:6,borderRadius:99},tagSoft:{backgroundColor:theme.colors.greenSoft},tagText:{color:"#DCE8DF",fontSize:9,fontWeight:"800",letterSpacing:1},tagTextSoft:{color:theme.colors.green},
 heroTitle:{color:"#fff",fontSize:34,lineHeight:39,fontWeight:"800",letterSpacing:-1,marginTop:17},heroAccent:{color:"#E5A58D",fontStyle:"italic"},heroCopy:{color:"#D2D9D3",fontSize:14,lineHeight:22,marginTop:13},heroFoot:{color:"#E5A58D",fontSize:9,fontWeight:"800",letterSpacing:1.2,marginTop:24},
 sectionHead:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:13,marginTop:4},sectionTitle:{fontSize:18,fontWeight:"800",color:theme.colors.ink},sectionHint:{fontSize:9,fontWeight:"800",letterSpacing:1,color:theme.colors.muted},
 quickGrid:{flexDirection:"row",flexWrap:"wrap",gap:10,marginBottom:28},quickCard:{width:"48%",flexGrow:1,backgroundColor:theme.colors.surface,borderRadius:16,borderWidth:1,borderColor:theme.colors.line,padding:14,minHeight:150},quickGlyph:{fontSize:20,color:theme.colors.accent,marginBottom:12},quickName:{fontSize:14,fontWeight:"800",color:theme.colors.ink},quickDesc:{fontSize:11,lineHeight:16,color:theme.colors.muted,marginTop:5},open:{fontSize:9,fontWeight:"900",letterSpacing:1,color:theme.colors.accent,marginTop:12},
 search:{backgroundColor:theme.colors.surface,borderColor:theme.colors.line,borderWidth:1,borderRadius:13,paddingHorizontal:14,paddingVertical:12,fontSize:13,color:theme.colors.ink,marginBottom:10},
 listRow:{flexDirection:"row",alignItems:"center",gap:12,paddingVertical:13,borderBottomWidth:1,borderBottomColor:theme.colors.line},listIcon:{width:38,height:38,borderRadius:12,backgroundColor:theme.colors.accentSoft,alignItems:"center",justifyContent:"center"},listGlyph:{fontSize:17,color:theme.colors.accent},listName:{fontSize:13,fontWeight:"800",color:theme.colors.ink},listDesc:{fontSize:10,lineHeight:15,color:theme.colors.muted,marginTop:3},chevron:{fontSize:24,color:theme.colors.muted,paddingHorizontal:4},empty:{color:theme.colors.muted,padding:18,textAlign:"center"},
 footer:{backgroundColor:theme.colors.greenSoft,borderRadius:16,padding:18,marginTop:25},footerTitle:{fontSize:14,fontWeight:"800",color:theme.colors.green},footerCopy:{fontSize:11,lineHeight:17,color:theme.colors.ink,marginTop:5}
});