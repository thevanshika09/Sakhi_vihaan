// Mock data for posts
export const mockPosts = [
  {
    id: "post-1",
    user: {
      name: "Priya Sharma",
      handle: "@priya_safety",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    content:
      "⚠️ ALERT: Beware of fake KYC verification messages claiming to be from SBI Bank. They are asking for OTP to steal your money. Always remember, banks never ask for OTP over phone or SMS.",
    media: "/placeholder.svg?height=300&width=500",
    timestamp: "2023-04-13T10:30:00Z",
    likes: 254,
    comments: 42,
    shares: 128,
    isLiked: false,
  },
  {
    id: "post-2",
    user: {
      name: "Cyber Security India",
      handle: "@cybersec_in",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: true,
    },
    content:
      "New scam alert: Fraudsters are creating fake UPI IDs similar to popular businesses. Always verify the UPI ID before making payments. Look for the verified merchant badge in your payment app.",
    timestamp: "2023-04-12T14:15:00Z",
    likes: 189,
    comments: 23,
    shares: 87,
    isLiked: true,
  },
  {
    id: "post-3",
    user: {
      name: "Rahul Verma",
      handle: "@rahul_v",
      avatar: "/placeholder.svg?height=40&width=40",
      isVerified: false,
    },
    content:
      "Just got a suspicious call from someone claiming to be from my bank. They asked for my card details and OTP. I immediately reported it to the bank. Stay safe everyone!",
    timestamp: "2023-04-11T09:45:00Z",
    likes: 87,
    comments: 15,
    shares: 32,
    isLiked: false,
  },
]

// Mock data for transactions
export const mockTransactions = [
  {
    id: "tx-1",
    type: "earned",
    description: "Posted scam alert",
    amount: 1,
    timestamp: "2023-04-13T10:35:00Z",
  },
  {
    id: "tx-2",
    type: "earned",
    description: "Reported fraud UPI ID",
    amount: 2,
    timestamp: "2023-04-12T15:20:00Z",
  },
  {
    id: "tx-3",
    type: "earned",
    description: "Invited friend: Priya",
    amount: 5,
    timestamp: "2023-04-10T11:15:00Z",
  },
  {
    id: "tx-4",
    type: "redemption",
    description: "Redeemed: 10% off on Myntra",
    amount: -10,
    timestamp: "2023-04-08T14:30:00Z",
  },
]

// Mock data for redemption offers
export const mockRedemptionOffers = [
  {
    id: "offer-1",
    title: "10% off on Myntra",
    description: "Get 10% discount on your next purchase",
    cost: 10,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "offer-2",
    title: "Rs.50 Cashback",
    description: "Get Rs.50 cashback on UPI transactions",
    cost: 50,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "offer-3",
    title: "Free Movie Ticket",
    description: "Get a free movie ticket on BookMyShow",
    cost: 100,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "offer-4",
    title: "Premium Features",
    description: "Unlock premium features for 1 month",
    cost: 25,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Mock data for referrals
export const mockReferrals = [
  {
    id: "ref-1",
    name: "Priya Sharma",
    date: "2023-04-10T11:15:00Z",
    status: "completed",
  },
  {
    id: "ref-2",
    name: "Rahul Verma",
    date: "2023-04-05T09:30:00Z",
    status: "completed",
  },
  {
    id: "ref-3",
    name: "Amit Kumar",
    date: "2023-04-02T14:45:00Z",
    status: "joined",
  },
  {
    id: "ref-4",
    name: "Neha Singh",
    date: "2023-03-28T16:20:00Z",
    status: "pending",
  },
]

// Mock data for groups
export const mockGroups = [
  {
    id: "group-1",
    name: "Scam Alert India",
    type: "public",
    members: 1245,
    alerts: 87,
    lastActivity: "2023-04-13T10:30:00Z",
  },
  {
    id: "group-2",
    name: "UPI Safety Network",
    type: "public",
    members: 856,
    alerts: 42,
    lastActivity: "2023-04-12T15:45:00Z",
  },
  {
    id: "group-3",
    name: "Family Safety Circle",
    type: "private",
    members: 6,
    alerts: 3,
    lastActivity: "2023-04-11T09:15:00Z",
  },
  {
    id: "group-4",
    name: "Office Colleagues",
    type: "private",
    members: 12,
    alerts: 5,
    lastActivity: "2023-04-10T14:20:00Z",
  },
]

// Mock data for verified sellers
export const mockVerifiedSellers = [
  {
    id: "seller-1",
    name: "Reliable Electronics",
    type: "Electronics Store",
    verifiedSince: "2023-01-15T00:00:00Z",
  },
  {
    id: "seller-2",
    name: "SafePay Solutions",
    type: "Financial Services",
    verifiedSince: "2023-02-10T00:00:00Z",
  },
  {
    id: "seller-3",
    name: "TrustMart",
    type: "E-commerce",
    verifiedSince: "2023-03-05T00:00:00Z",
  },
]
