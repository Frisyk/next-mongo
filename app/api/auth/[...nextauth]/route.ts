import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { User } from "@/lib/models";
import connecttoDB from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connecttoDB();
        
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error("signup_required");
        }
        
        // Jika login dengan Google sebelumnya dan tidak ada password
        if (!user.password) {
          throw new Error("use_google_login");
        }
        
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        
        if (!passwordMatch) {
          throw new Error("invalid_password");
        }
        
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          image: user.img,
          isAdmin: user.isAdmin,
          point: user.point,
          class: user.uclass,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.point = user.point;
        token.class = user.class;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("[NextAuth] Session Callback - Token:", token);
      
      if (token) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.point = token.point as number;
        session.user.class = token.class as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // console.log("[NextAuth] SignIn Callback - Provider:", account?.provider);
      // console.log("[NextAuth] SignIn Callback - User:", user ? { ...user, password: undefined } : null);
      // console.log("[NextAuth] SignIn Callback - Profile:", profile);
      
      if (account?.provider === "google") {
        try {
          await connecttoDB();
          
          console.log("[NextAuth] Google SignIn - Checking for existing user with email:", user.email);
          
          // Cek apakah user sudah ada di database
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            console.log("[NextAuth] Google SignIn - Creating new user");
            // Buat user baru jika belum ada
            try {
              const newUser = await User.create({
                username: user.name,
                email: user.email,
                uclass: "User Google",
                img: user.image,
                point: 0,
                password: "", // Google login tidak menggunakan password
                isAdmin: false,
              });
              // console.log("[NextAuth] Google SignIn - New user created:", newUser._id);
            } catch (error: any) {
              // console.error("[NextAuth] Error creating new user:", error);
              // Coba lagi dengan password dummy jika diperlukan oleh validasi schema
              if (error.message && error.message.includes('required')) {
                const dummyPassword = await bcrypt.hash("GOOGLE_USER_" + Date.now(), 10);
                const newUser = await User.create({
                  username: user.name,
                  email: user.email,
                  uclass: "User Google",
                  img: user.image,
                  point: 0,
                  password: dummyPassword,
                  isAdmin: false,
                });
                // console.log("[NextAuth] Google SignIn - New user created with dummy password:", newUser._id);
              } else {
                throw error;
              }
            }
          } else {
            // console.log("[NextAuth] Google SignIn - Existing user found:", existingUser._id);
            // Update info user jika sudah ada
            existingUser.img = user.image;
            
            // Set password dummy jika null/undefined (mungkin diperlukan oleh validasi schema)
            if (!existingUser.password) {
              // console.log("[NextAuth] Google SignIn - Setting dummy password for existing user");
              existingUser.password = await bcrypt.hash("GOOGLE_USER_" + Date.now(), 10);
            }
            
            await existingUser.save();
            // console.log("[NextAuth] Google SignIn - User profile updated");
          }
        } catch (error) {
          // console.error("[NextAuth] Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode for more verbose logs
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 