"""
ATHLYNX App Priority Engine
Python AI Bot for dynamic app prioritization and rendering

This engine determines which apps to highlight based on:
- Launch readiness
- User engagement
- Strategic priorities
"""

from typing import List, Dict, Any
from enum import Enum

class AppTier(Enum):
    """App priority tiers"""
    CROWN = 1  # King & Queen (Crab Logo + ATHLYNX)
    PRIORITY = 2  # Main focus apps (Diamond Grind, Portal, Messenger, Transfer Portal)
    SUPPORTING = 3  # Secondary apps

class AppStatus(Enum):
    """App launch status"""
    LIVE = "LIVE"
    LAUNCHING_SOON = "LAUNCHING SOON"
    BETA = "BETA"
    COMING_SOON = "COMING SOON"

class App:
    """App data model"""
    def __init__(
        self,
        id: str,
        name: str,
        tier: AppTier,
        status: AppStatus,
        icon: str,
        description: str,
        url: str,
        priority_order: int,
        badge: str = None
    ):
        self.id = id
        self.name = name
        self.tier = tier
        self.status = status
        self.icon = icon
        self.description = description
        self.url = url
        self.priority_order = priority_order
        self.badge = badge

class AppPriorityEngine:
    """
    AI-powered app prioritization engine
    Determines which apps to highlight and in what order
    """
    
    def __init__(self):
        self.apps = self._initialize_apps()
    
    def _initialize_apps(self) -> List[App]:
        """Initialize all apps with their priority tiers"""
        return [
            # CROWN TIER (King & Queen)
            App(
                id="dhg_crab",
                name="DHG Crab Logo",
                tier=AppTier.CROWN,
                status=AppStatus.LIVE,
                icon="🦀",
                description="Dozier Holdings Group - Parent Company",
                url="/dhg-empire",
                priority_order=1,
                badge="👑 CROWN"
            ),
            App(
                id="athlynx",
                name="ATHLYNX",
                tier=AppTier.CROWN,
                status=AppStatus.LIVE,
                icon="⚡",
                description="The Athlete's Playbook",
                url="/",
                priority_order=2,
                badge="👑 KINGDOM"
            ),
            
            # PRIORITY TIER (Main Focus)
            App(
                id="diamond_grind",
                name="Diamond Grind",
                tier=AppTier.PRIORITY,
                status=AppStatus.LAUNCHING_SOON,
                icon="⚾",
                description="Elite Baseball Platform - FIRST TO ROLL OUT",
                url="/diamond-grind",
                priority_order=1,
                badge="🚀 LAUNCHING FIRST"
            ),
            App(
                id="portal",
                name="Portal",
                tier=AppTier.PRIORITY,
                status=AppStatus.LIVE,
                icon="🌐",
                description="NIL Social Network",
                url="/nil-portal",
                priority_order=2,
                badge="✅ ACTIVE"
            ),
            App(
                id="messenger",
                name="Messenger",
                tier=AppTier.PRIORITY,
                status=AppStatus.LIVE,
                icon="💬",
                description="HIPAA-Compliant Communication",
                url="/messenger",
                priority_order=3,
                badge="✅ ACTIVE"
            ),
            App(
                id="transfer_portal",
                name="Transfer Portal",
                tier=AppTier.PRIORITY,
                status=AppStatus.LAUNCHING_SOON,
                icon="🔄",
                description="Career Transition Intelligence - IT'S TIME!",
                url="/transfer-portal",
                priority_order=4,
                badge="⏰ IT'S TIME"
            ),
            
            # SUPPORTING TIER
            App(
                id="warriors_playbook",
                name="Warriors Playbook",
                tier=AppTier.SUPPORTING,
                status=AppStatus.BETA,
                icon="🛡️",
                description="Faith-Based Development",
                url="/warriors-playbook",
                priority_order=5
            ),
            App(
                id="faith",
                name="Faith",
                tier=AppTier.SUPPORTING,
                status=AppStatus.LIVE,
                icon="✝️",
                description="Spiritual Growth",
                url="/faith",
                priority_order=6
            ),
            App(
                id="nil_vault",
                name="NIL Vault",
                tier=AppTier.SUPPORTING,
                status=AppStatus.BETA,
                icon="💰",
                description="Deal Management",
                url="/nil-marketplace",
                priority_order=7
            ),
            App(
                id="ai_sales",
                name="AI Sales",
                tier=AppTier.SUPPORTING,
                status=AppStatus.COMING_SOON,
                icon="🤖",
                description="AI Brand Partnerships",
                url="/apps",
                priority_order=8
            ),
            App(
                id="ai_recruiter",
                name="AI Recruiter",
                tier=AppTier.SUPPORTING,
                status=AppStatus.COMING_SOON,
                icon="🎓",
                description="AI Recruiting Assistant",
                url="/apps",
                priority_order=9
            ),
            App(
                id="ai_content",
                name="AI Content",
                tier=AppTier.SUPPORTING,
                status=AppStatus.COMING_SOON,
                icon="📝",
                description="AI Content Creation",
                url="/apps",
                priority_order=10
            ),
        ]
    
    def get_priority_apps(self) -> List[App]:
        """Get apps in PRIORITY tier"""
        return [app for app in self.apps if app.tier == AppTier.PRIORITY]
    
    def get_supporting_apps(self) -> List[App]:
        """Get apps in SUPPORTING tier"""
        return [app for app in self.apps if app.tier == AppTier.SUPPORTING]
    
    def get_all_apps_sorted(self) -> List[App]:
        """Get all apps sorted by tier and priority"""
        return sorted(self.apps, key=lambda x: (x.tier.value, x.priority_order))
    
    def get_app_by_id(self, app_id: str) -> App:
        """Get specific app by ID"""
        return next((app for app in self.apps if app.id == app_id), None)
    
    def generate_app_grid_data(self) -> Dict[str, Any]:
        """
        Generate data structure for frontend app grid
        Returns JSON-serializable dict
        """
        priority_apps = self.get_priority_apps()
        supporting_apps = self.get_supporting_apps()
        
        return {
            "crown": {
                "crab_logo": {
                    "name": "DHG Crab Logo",
                    "icon": "🦀",
                    "badge": "👑 CROWN",
                    "description": "Dozier Holdings Group",
                    "url": "/dhg-empire"
                },
                "athlynx": {
                    "name": "ATHLYNX",
                    "icon": "⚡",
                    "badge": "👑 KINGDOM",
                    "description": "The Athlete's Playbook",
                    "url": "/"
                }
            },
            "priority_apps": [
                {
                    "id": app.id,
                    "name": app.name,
                    "icon": app.icon,
                    "description": app.description,
                    "url": app.url,
                    "status": app.status.value,
                    "badge": app.badge,
                    "priority": app.priority_order,
                    "highlight": True
                }
                for app in sorted(priority_apps, key=lambda x: x.priority_order)
            ],
            "supporting_apps": [
                {
                    "id": app.id,
                    "name": app.name,
                    "icon": app.icon,
                    "description": app.description,
                    "url": app.url,
                    "status": app.status.value,
                    "badge": app.badge,
                    "priority": app.priority_order,
                    "highlight": False
                }
                for app in sorted(supporting_apps, key=lambda x: x.priority_order)
            ]
        }
    
    def get_launch_sequence(self) -> List[Dict[str, Any]]:
        """
        Get apps in launch sequence order
        Diamond Grind first, then others
        """
        priority_apps = sorted(
            self.get_priority_apps(),
            key=lambda x: x.priority_order
        )
        
        return [
            {
                "name": app.name,
                "status": app.status.value,
                "launch_order": app.priority_order,
                "badge": app.badge,
                "description": app.description
            }
            for app in priority_apps
        ]


# Example usage
if __name__ == "__main__":
    engine = AppPriorityEngine()
    
    print("🎯 ATHLYNX APP PRIORITY ENGINE")
    print("=" * 50)
    
    print("\n👑 CROWN TIER (King & Queen):")
    print("  1. 🦀 DHG Crab Logo - Parent Company")
    print("  2. ⚡ ATHLYNX - The Kingdom")
    
    print("\n💎 PRIORITY APPS (Main Focus):")
    for app in engine.get_priority_apps():
        print(f"  {app.priority_order}. {app.icon} {app.name} - {app.badge}")
    
    print("\n🎯 SUPPORTING APPS:")
    for app in engine.get_supporting_apps():
        print(f"  {app.priority_order}. {app.icon} {app.name}")
    
    print("\n🚀 LAUNCH SEQUENCE:")
    for item in engine.get_launch_sequence():
        print(f"  {item['launch_order']}. {item['name']} - {item['status']}")
    
    print("\n✅ App grid data generated successfully!")
    print(f"   Total apps: {len(engine.apps)}")
    print(f"   Priority apps: {len(engine.get_priority_apps())}")
    print(f"   Supporting apps: {len(engine.get_supporting_apps())}")
