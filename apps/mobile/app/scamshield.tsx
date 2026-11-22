import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, Pressable, View } from "react-native";
import { Stack } from "expo-router";
import { theme } from "@/theme";

type Finding = { title: string; detail: string };
type Result = { level: "high" | "caution" | "none"; findings: Finding[]; notes: string[] };
const credentialPattern = /\b(otp|one[- ]time password|pin code|password|passcode|seed phrase|recovery phrase|cvv|card number)\b/i;
const urgencyPattern = /\b(act now|immediately|within (\d+ )?(hour|hours|minute|minutes)|account (will be |is )?(blocked|suspended|closed)|verify now|last warning|urgent action)\b/i;
const paymentPattern = /\b(registration fee|processing fee|activation fee|release fee|clearance fee|pay to unlock|send (the )?money|transfer now|claim your prize)\b/i;
const shorteners = new Set(["bit.ly","tinyurl.com","t.co","cutt.ly","shorturl.at","is.gd","rb.gy","ow.ly"]);

function inspectMessage(value: string): Result {
  const findings: Finding[] = [];
  const notes: string[] = [];
  if (credentialPattern.test(value)) findings.push({title:"Sensitive credentials mentioned",detail:"The message appears to request or discuss an OTP, PIN, password, recovery phrase or payment-card secret. Never share these with anyone."});
  if (urgencyPattern.test(value)) findings.push({title:"Pressure or urgency language",detail:"Urgent threats about blocked accounts or short deadlines are commonly used to pressure people into acting without checking."});
  if (paymentPattern.test(value)) findings.push({title:"Upfront payment or transfer request",detail:"A fee or transfer request connected to a prize, job, release or account action needs independent verification."});
  const urls = value.match(/https?:\/\/[^\s<>()]+/gi) ?? [];
  for (const raw of urls) {
    try {
      const parsed = new URL(raw.replace(/[.,!?;:]$/, ""));
      const host = parsed.hostname.toLowerCase();
      if (shorteners.has(host)) findings.push({title:"Shortened link detected",detail:host + " hides the final destination. Do not open it until the destination is independently confirmed."});
      if (host.startsWith("xn--") || host.split(".").some(part=>part.startsWith("xn--"))) findings.push({title:"Internationalised domain encoding",detail:"This domain contains punycode. Lookalike characters can make a deceptive address resemble a trusted brand."});
      if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) findings.push({title:"Link uses a raw IP address",detail:"A public website link using a raw IP address is unusual. Treat it cautiously and verify the organisation separately."});
      if (parsed.protocol !== "https:") notes.push("At least one link does not use HTTPS. This means the connection may not be encrypted; it does not, by itself, prove the site is fraudulent.");
    } catch {
      findings.push({title:"A link could not be parsed",detail:"The address may be incomplete or malformed. Do not open it until you can verify the exact destination."});
    }
  }
  if (!urls.length && /\b(https?:\/\/|www\.)/i.test(value)) findings.push({title:"Possible web address",detail:"A web address is present but could not be extracted cleanly. Check the exact spelling before opening it."});
  return {level:findings.length>=3?"high":findings.length>0?"caution":"none",findings,notes};
}

export default function ScamShieldScreen() {
  const [input,setInput]=useState("");
  const [result,setResult]=useState<Result|null>(null);
  const ready=input.trim().length>=8;
  const title=useMemo(()=>result?.level==="high"?"Several warning indicators":result?.level==="caution"?"Some warning indicators":"No obvious indicators found", [result]);
  return <><Stack.Screen options={{headerShown:true,title:"ScamShield",headerBackTitle:"Back",headerTintColor:theme.colors.ink,headerStyle:{backgroundColor:theme.colors.paper},headerShadowVisible:false}}/><ScrollView style={s.page} contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
    <Text style={s.eyebrow}>PROTECT / OFFLINE CHECK</Text>
    <Text style={s.title}>Pause. Check. Then act.</Text>
    <Text style={s.copy}>Review a suspicious message or link for common warning signs. This first version runs on your device and does not send your text anywhere.</Text>
    <View style={s.warning}><Text style={s.warningTitle}>Do not paste secrets</Text><Text style={s.warningText}>Never enter passwords, OTPs, PINs, recovery phrases or full card details—even when checking a message.</Text></View>
    <Text style={s.label}>MESSAGE OR URL</Text>
    <TextInput multiline value={input} onChangeText={v=>{setInput(v);setResult(null)}} placeholder="Paste the suspicious message or URL here…" placeholderTextColor={theme.colors.muted} style={s.input} textAlignVertical="top" />
    <Pressable disabled={!ready} onPress={()=>setResult(inspectMessage(input))} style={[s.button,!ready&&s.disabled]}><Text style={s.buttonText}>Check for warning signs</Text></Pressable>
    {result&&<View style={s.result}>
      <View style={[s.resultHead,result.level==="high"?s.high:result.level==="caution"?s.caution:s.none]}><Text style={s.resultKicker}>PRELIMINARY INDICATOR REVIEW</Text><Text style={s.resultTitle}>{title}</Text></View>
      {result.findings.length?result.findings.map((f,i)=><View key={i} style={s.finding}><Text style={s.findingTitle}>{i+1}. {f.title}</Text><Text style={s.findingText}>{f.detail}</Text></View>):<Text style={s.findingText}>This offline check did not find the patterns it looks for. That is not proof that the message or link is safe.</Text>}
      {result.notes.map((n,i)=><Text key={i} style={s.note}>{n}</Text>)}
      <Text style={s.nextTitle}>Safer next steps</Text>
      <Text style={s.nextText}>• Contact the bank, company or person using a phone number or app you already trust.{"\n"}• Do not use the contact details or links inside the suspicious message.{"\n"}• Do not pay a fee to unlock a prize, job or grant.{"\n"}• Preserve the message and report suspected fraud through the relevant official channel.</Text>
      <Text style={s.disclaimer}>This is an offline pattern check, not a live threat-intelligence lookup, forensic examination or guarantee of safety. Results can be incomplete.</Text>
    </View>}
    <Text style={s.footer}>No account or server storage in this build. Checks remain on this device session.</Text>
  </ScrollView></>;
}
const s=StyleSheet.create({
 page:{flex:1,backgroundColor:theme.colors.paper},body:{padding:22,paddingBottom:42},eyebrow:{fontSize:10,fontWeight:"900",letterSpacing:1.8,color:theme.colors.accent},title:{fontSize:31,fontWeight:"900",lineHeight:37,color:theme.colors.ink,marginTop:10},copy:{fontSize:13,lineHeight:21,color:theme.colors.muted,marginTop:10,marginBottom:18},
 warning:{backgroundColor:theme.colors.amberSoft,borderRadius:14,padding:15,marginBottom:20},warningTitle:{fontSize:12,fontWeight:"900",color:theme.colors.amber},warningText:{fontSize:11,lineHeight:17,color:theme.colors.ink,marginTop:5},
 label:{fontSize:10,fontWeight:"900",letterSpacing:1,color:theme.colors.muted,marginBottom:8},input:{minHeight:145,backgroundColor:theme.colors.surface,borderWidth:1,borderColor:theme.colors.line,borderRadius:14,padding:14,fontSize:13,lineHeight:20,color:theme.colors.ink},
 button:{backgroundColor:theme.colors.ink,borderRadius:13,padding:15,alignItems:"center",marginTop:12},disabled:{opacity:.4},buttonText:{color:"#fff",fontWeight:"800",fontSize:13},
 result:{backgroundColor:theme.colors.surface,borderRadius:16,borderWidth:1,borderColor:theme.colors.line,overflow:"hidden",marginTop:20,paddingBottom:17},resultHead:{padding:16},high:{backgroundColor:"#F4E1DE"},caution:{backgroundColor:theme.colors.amberSoft},none:{backgroundColor:theme.colors.greenSoft},resultKicker:{fontSize:9,fontWeight:"900",letterSpacing:1,color:theme.colors.muted},resultTitle:{fontSize:17,fontWeight:"900",color:theme.colors.ink,marginTop:6},
 finding:{paddingHorizontal:16,paddingTop:14},findingTitle:{fontSize:12,fontWeight:"900",color:theme.colors.ink},findingText:{fontSize:11,lineHeight:17,color:theme.colors.muted,marginTop:4},note:{fontSize:11,lineHeight:17,color:theme.colors.amber,marginHorizontal:16,marginTop:12},nextTitle:{fontSize:13,fontWeight:"900",color:theme.colors.ink,marginHorizontal:16,marginTop:18},nextText:{fontSize:11,lineHeight:19,color:theme.colors.ink,marginHorizontal:16,marginTop:7},disclaimer:{fontSize:10,lineHeight:16,color:theme.colors.muted,marginHorizontal:16,marginTop:16},footer:{fontSize:10,lineHeight:16,color:theme.colors.muted,marginTop:18}
});