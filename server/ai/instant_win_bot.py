#!/usr/bin/env python3
"""
ATHLYNX Instant Win Bot - The Addiction Engine
Creates immediate dopamine hits for new users

Strategy: FAST HIGH → CRAVING → UPGRADE
"""

import os
import json
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional
from openai import OpenAI

# Initialize OpenAI client (using Manus pre-configured environment)
client = OpenAI()

class InstantWinBot:
    """
    Generates instant gratification for new users
    Goal: Hook them in the first 5 minutes
    """
    
    def __init__(self):
        self.model = "gpt-4.1-mini"  # Fast and cheap for instant responses
        
    def generate_profile_instantly(self, user_data: Dict) -> Dict:
        """
        Generate a stunning athlete profile in under 2 minutes
        Returns: Complete profile with AI-generated content
        """
        start_time = time.time()
        
        prompt = f"""
        Create an AMAZING athlete profile for:
        Name: {user_data.get('name', 'Athlete')}
        Sport: {user_data.get('sport', 'Football')}
        Position: {user_data.get('position', 'QB')}
        School: {user_data.get('school', 'University')}
        
        Generate:
        1. Compelling bio (50 words, inspirational)
        2. 3 key strengths
        3. Career highlights (3 bullet points)
        4. Personal brand statement (1 sentence, powerful)
        5. 5 relevant hashtags
        
        Make it sound ELITE and professional. This athlete should feel like a STAR.
        Return as JSON with keys: bio, strengths, highlights, brand_statement, hashtags
        """
        
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are an elite sports marketing expert who creates compelling athlete profiles."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            response_format={"type": "json_object"}
        )
        
        profile = json.loads(response.choices[0].message.content)
        profile['generation_time'] = round(time.time() - start_time, 2)
        profile['timestamp'] = datetime.now().isoformat()
        
        return profile
    
    def find_instant_nil_matches(self, athlete_profile: Dict) -> List[Dict]:
        """
        Find NIL opportunities INSTANTLY (even if fake/demo for now)
        Goal: Show them money-making potential in first 3 minutes
        """
        
        # Generate realistic NIL opportunities based on athlete profile
        sport = athlete_profile.get('sport', 'Football')
        position = athlete_profile.get('position', 'Athlete')
        
        prompt = f"""
        Generate 5 realistic NIL deal opportunities for a {sport} {position}.
        
        For each deal, include:
        - brand_name: Real or realistic brand
        - deal_type: (Social Post, Appearance, Endorsement, Content Creation)
        - estimated_value: Dollar amount ($500-$5000 range)
        - requirements: Brief description
        - urgency: (High, Medium, Low)
        - match_score: Percentage (75-98%)
        
        Make the first 2 deals HIGH urgency with HIGH values to create excitement.
        Return as JSON array.
        """
        
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are an NIL deal matchmaker who finds lucrative opportunities for athletes."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.9,
            response_format={"type": "json_object"}
        )
        
        result = json.loads(response.choices[0].message.content)
        opportunities = result.get('opportunities', [])
        
        # Add metadata
        for opp in opportunities:
            opp['discovered_at'] = datetime.now().isoformat()
            opp['expires_in_hours'] = 48 if opp.get('urgency') == 'High' else 168
            opp['status'] = 'locked' if len(opportunities) > 2 else 'available'  # Lock most opportunities
        
        return opportunities
    
    def calculate_potential_earnings(self, opportunities: List[Dict]) -> Dict:
        """
        Calculate and display potential earnings to create FOMO
        """
        total_value = sum(opp.get('estimated_value', 0) for opp in opportunities)
        available_value = sum(opp.get('estimated_value', 0) for opp in opportunities if opp.get('status') == 'available')
        locked_value = total_value - available_value
        
        return {
            'total_opportunities': len(opportunities),
            'total_potential_value': total_value,
            'available_value': available_value,
            'locked_value': locked_value,
            'unlock_message': f"Upgrade to unlock ${locked_value:,} in additional opportunities!",
            'urgency_message': "3 high-value deals expire in 48 hours!"
        }
    
    def generate_social_proof(self) -> Dict:
        """
        Generate social proof to create FOMO
        "Other athletes are making money RIGHT NOW"
        """
        return {
            'recent_deals': [
                {'athlete': 'Marcus J.', 'sport': 'Football', 'amount': 2500, 'brand': 'Nike', 'time_ago': '2 hours ago'},
                {'athlete': 'Sarah W.', 'sport': 'Basketball', 'amount': 1800, 'brand': 'Gatorade', 'time_ago': '5 hours ago'},
                {'athlete': 'Tyler R.', 'sport': 'Baseball', 'amount': 3200, 'brand': 'Under Armour', 'time_ago': '1 day ago'},
            ],
            'stats': {
                'total_athletes_earning': 1247,
                'total_deals_this_week': 89,
                'average_deal_value': 1850,
                'top_earner_this_month': 15600
            },
            'trending_message': "🔥 1,247 athletes are earning on ATHLYNX right now!"
        }
    
    def create_credit_scarcity(self, user_credits: int = 100) -> Dict:
        """
        Create artificial scarcity with AI credits
        Goal: Make them feel like they're running out
        """
        credits_used = 20  # Simulate initial usage
        credits_remaining = user_credits - credits_used
        
        actions_cost = {
            'profile_generation': 10,
            'nil_search': 5,
            'brand_message': 15,
            'ai_optimization': 20,
            'video_analysis': 25
        }
        
        return {
            'total_credits': user_credits,
            'credits_used': credits_used,
            'credits_remaining': credits_remaining,
            'percentage_used': (credits_used / user_credits) * 100,
            'actions_remaining': {
                'nil_searches': credits_remaining // actions_cost['nil_search'],
                'brand_messages': credits_remaining // actions_cost['brand_message'],
                'ai_optimizations': credits_remaining // actions_cost['ai_optimization']
            },
            'warning_message': f"⚠️ Only {credits_remaining} credits left! Upgrade for UNLIMITED.",
            'upgrade_cta': "Get unlimited AI credits with Premium ($29.99/month)"
        }
    
    def generate_fomo_notifications(self, athlete_id: str) -> List[Dict]:
        """
        Generate FOMO-inducing notifications
        Goal: Make them check the app constantly
        """
        notifications = [
            {
                'type': 'opportunity',
                'title': '💰 New NIL Match Found!',
                'message': 'Nike is looking for athletes like you - $2,500 deal',
                'action': 'View Deal',
                'urgency': 'high',
                'locked': False
            },
            {
                'type': 'brand_interest',
                'title': '👀 3 Brands Viewed Your Profile',
                'message': 'Upgrade to see who\'s interested',
                'action': 'Upgrade Now',
                'urgency': 'medium',
                'locked': True
            },
            {
                'type': 'earnings',
                'title': '🔥 Athletes Earned $45K This Week',
                'message': 'You could be next! Upgrade to unlock all opportunities',
                'action': 'See Opportunities',
                'urgency': 'medium',
                'locked': True
            },
            {
                'type': 'expiring',
                'title': '⏰ Deal Expires in 24 Hours',
                'message': '$1,800 Gatorade deal expires tomorrow',
                'action': 'Claim Deal',
                'urgency': 'critical',
                'locked': True
            },
            {
                'type': 'social_proof',
                'title': '🎉 Sarah W. Just Signed a $3,200 Deal',
                'message': 'Join 1,247 athletes earning on ATHLYNX',
                'action': 'Start Earning',
                'urgency': 'low',
                'locked': False
            }
        ]
        
        return notifications
    
    def create_upgrade_urgency(self, trial_day: int) -> Dict:
        """
        Create urgency based on trial day
        Day 1: Gentle nudge
        Day 7: PANIC MODE
        """
        days_remaining = 7 - trial_day
        
        urgency_levels = {
            1: {
                'message': '🎉 Welcome! You have 7 days to explore everything FREE',
                'cta': 'Explore Features',
                'urgency': 'low'
            },
            3: {
                'message': '💡 You\'ve unlocked $12K in opportunities! Upgrade to claim them',
                'cta': 'Upgrade Now (33% off)',
                'urgency': 'medium'
            },
            5: {
                'message': '⚠️ Your trial ends in 2 days! Don\'t lose access to your matches',
                'cta': 'Upgrade Now',
                'urgency': 'high'
            },
            7: {
                'message': '🚨 LAST DAY! Upgrade now or lose 5 pending deals worth $8,500',
                'cta': 'UPGRADE NOW (Save 33%)',
                'urgency': 'critical'
            }
        }
        
        return urgency_levels.get(trial_day, urgency_levels[1])
    
    def run_instant_win_sequence(self, user_data: Dict) -> Dict:
        """
        Execute the complete instant win sequence
        Goal: Hook them in 5 minutes
        """
        print("🚀 Starting Instant Win Sequence...")
        
        # Step 1: Generate profile (2 minutes)
        print("⚡ Generating AI profile...")
        profile = self.generate_profile_instantly(user_data)
        print(f"✅ Profile generated in {profile['generation_time']}s")
        
        # Step 2: Find NIL matches (instant)
        print("💰 Finding NIL opportunities...")
        opportunities = self.find_instant_nil_matches(user_data)
        print(f"✅ Found {len(opportunities)} opportunities")
        
        # Step 3: Calculate earnings potential
        earnings = self.calculate_potential_earnings(opportunities)
        print(f"💵 Total potential: ${earnings['total_potential_value']:,}")
        
        # Step 4: Generate social proof
        social_proof = self.generate_social_proof()
        
        # Step 5: Show credit scarcity
        credits = self.create_credit_scarcity()
        
        # Step 6: Generate FOMO notifications
        notifications = self.generate_fomo_notifications(user_data.get('id', 'user123'))
        
        # Step 7: Create upgrade urgency
        urgency = self.create_upgrade_urgency(trial_day=1)
        
        return {
            'success': True,
            'profile': profile,
            'opportunities': opportunities,
            'earnings_potential': earnings,
            'social_proof': social_proof,
            'credits': credits,
            'notifications': notifications,
            'upgrade_urgency': urgency,
            'hook_message': f"🎉 CONGRATS! You unlocked ${earnings['total_potential_value']:,} in opportunities! Upgrade to claim them all."
        }


def main():
    """
    Test the Instant Win Bot
    """
    bot = InstantWinBot()
    
    # Simulate new user
    test_user = {
        'id': 'user123',
        'name': 'Marcus Johnson',
        'sport': 'Football',
        'position': 'QB',
        'school': 'University of Texas',
        'class_year': '2026'
    }
    
    # Run the addiction sequence
    result = bot.run_instant_win_sequence(test_user)
    
    # Display results
    print("\n" + "="*60)
    print("🎯 INSTANT WIN SEQUENCE COMPLETE!")
    print("="*60)
    print(f"\n📝 Profile Generated: {result['profile']['bio'][:100]}...")
    print(f"\n💰 Opportunities Found: {len(result['opportunities'])}")
    print(f"💵 Total Potential Value: ${result['earnings_potential']['total_potential_value']:,}")
    print(f"🔒 Locked Value: ${result['earnings_potential']['locked_value']:,}")
    print(f"\n⚡ Credits Remaining: {result['credits']['credits_remaining']}/100")
    print(f"⚠️ {result['credits']['warning_message']}")
    print(f"\n🔥 {result['social_proof']['trending_message']}")
    print(f"\n🎯 {result['hook_message']}")
    print("\n" + "="*60)
    
    # Save results
    output_file = '/home/ubuntu/athlynx-vip-platform/instant_win_results.json'
    with open(output_file, 'w') as f:
        json.dump(result, f, indent=2)
    print(f"✅ Results saved to {output_file}")


if __name__ == "__main__":
    main()
