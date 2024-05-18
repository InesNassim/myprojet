import { LucideProps, User } from "lucide-react";

export const Icons = {
    user:User,
    logo:(props: LucideProps) => (
       <svg {...props} viewBox="0 0 24 24">
        <path d="m6.94 14.036c-.233.624-.43 1.2-.606 1.783.96-.697 2.101-1.139 3.418-1.304 2.513-.314 4.746"></path>
       </svg>
    ),
}