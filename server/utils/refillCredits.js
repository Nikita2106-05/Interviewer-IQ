export const REFILL_INTERVAL = 30 * 60 * 1000; // 30 min (milliseconds)
export const REFILL_AMOUNT = 50;               // har interval pe +50
export const MAX_CREDITS = 100;                // isse upar free refill nahi

const refillCredits = async (user) => {
  const now = Date.now();

  // CASE 1: credits already full (ya usse zyada)
  // refill ki zaroorat nahi, bas timer abhi se shuru rakho
  if (user.credits >= MAX_CREDITS) {
    user.lastRefillAt = new Date(now);
    await user.save();
    return user;
  }

  // CASE 2: purane user jinke paas lastRefillAt hai hi nahi
  if (!user.lastRefillAt) {
    user.lastRefillAt = new Date(now);
    await user.save();
    return user;
  }

  // CASE 3: normal refill
  const last = new Date(user.lastRefillAt).getTime();
  const intervalsPassed = Math.floor((now - last) / REFILL_INTERVAL);

  if (intervalsPassed > 0) {
    const newCredits = user.credits + intervalsPassed * REFILL_AMOUNT;
    user.credits = Math.min(newCredits, MAX_CREDITS);

    if (user.credits >= MAX_CREDITS) {
      user.lastRefillAt = new Date(now);
    } else {
      // bacha hua time zaya na ho
      user.lastRefillAt = new Date(last + intervalsPassed * REFILL_INTERVAL);
    }
    await user.save();
  }

  return user;
};

// Frontend countdown ke liye: agla refill kab hoga
export const getNextRefillAt = (user) => {
  if (user.credits >= MAX_CREDITS || !user.lastRefillAt) return null;
  return new Date(new Date(user.lastRefillAt).getTime() + REFILL_INTERVAL);
};

export default refillCredits;